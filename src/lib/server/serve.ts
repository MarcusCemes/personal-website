import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Readable } from "node:stream";

export interface ServeFileOptions {
    /**
     * The original SvelteKit Request object.
     * Used to extract the 'Range' header automatically.
     */
    request?: Request;

    /**
     * MIME type of the file (e.g., 'video/mp4').
     * If not provided, it will be omitted or you can add a library to guess it.
     */
    contentType?: string;

    /**
     * Custom cache control header. Defaults to 'public, max-age=3600'.
     */
    cacheControl?: string;
}

export interface ParsedRange {
    start: number;
    end: number;
    length: number;
}

/**
 * Serves a file as a streaming Response, handling Range requests and
 * cleaning up file descriptors automatically using Web Streams.
 */
export async function serveFile(
    filePath: string,
    options: ServeFileOptions = {},
): Promise<Response> {
    const { request, contentType, cacheControl = "public, max-age=3600" } = options;

    // 1. Check file stats
    const fileSize = await getFileSize(filePath);
    if (fileSize === null) {
        return new Response("Not Found", { status: 404 });
    }

    // 2. Determine headers
    const headers = new Headers();
    headers.set("Accept-Ranges", "bytes");
    headers.set("Cache-Control", cacheControl);
    if (contentType) {
        headers.set("Content-Type", contentType);
    }

    // 3. Handle Range (if request exists)
    const rangeHeader = request?.headers.get("range");
    const parsedRange = rangeHeader ? parseRangeHeader(rangeHeader, fileSize) : null;

    // 4. Create Node Stream
    let nodeStream: Readable;
    let status = 200;

    if (parsedRange) {
        // Partial Content
        const { start, end, length } = parsedRange;

        // Handle invalid ranges strictly (RFC 7233)
        if (start >= fileSize || end >= fileSize) {
            headers.set("Content-Range", `bytes */${fileSize}`);
            return new Response("Range Not Satisfiable", { status: 416, headers });
        }

        nodeStream = createReadStream(filePath, { start, end });

        status = 206;
        headers.set("Content-Range", `bytes ${start}-${end}/${fileSize}`);
        headers.set("Content-Length", length.toString());
    } else {
        // Full Content
        nodeStream = createReadStream(filePath);
        headers.set("Content-Length", fileSize.toString());
    }

    // 5. Convert to Web Stream (Crucial for SvelteKit/Standard Compliance)
    // This ensures that if the request is aborted (signal), the Node stream is destroyed.
    const webStream = Readable.toWeb(nodeStream);

    return new Response(webStream as ReadableStream<Uint8Array>, {
        status,
        headers,
    });
}

export function parseRangeHeader(rangeHeader: string, fileSize: number): ParsedRange | null {
    if (!rangeHeader || !rangeHeader.startsWith("bytes=")) {
        return null;
    }

    const parts = rangeHeader.replace("bytes=", "").split("-");
    const startStr = parts[0];
    const endStr = parts[1];

    let start: number;
    let end: number;

    // Case: bytes=-500 (last 500 bytes)
    if (startStr === "" && endStr) {
        const offset = parseInt(endStr, 10);
        start = Math.max(0, fileSize - offset);
        end = fileSize - 1;
    }
    // Case: bytes=100- (from 100 to end)
    else if (startStr && endStr === "") {
        start = parseInt(startStr, 10);
        end = fileSize - 1;
    }
    // Case: bytes=100-200
    else {
        start = parseInt(startStr, 10);
        end = parseInt(endStr, 10);
    }

    // Basic validation
    if (isNaN(start) || isNaN(end) || start > end) {
        return null;
    }

    // Cap end at filesize (though strict 416 check happens in serveFile)
    end = Math.min(end, fileSize - 1);

    return {
        start,
        end,
        length: end - start + 1,
    };
}

async function getFileSize(path: string): Promise<number | null> {
    try {
        const stats = await stat(path);
        return stats.isFile() ? stats.size : null;
    } catch {
        return null;
    }
}
