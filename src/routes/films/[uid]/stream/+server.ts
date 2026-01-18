import { join, resolve, sep } from "node:path";

import { env } from "$env/dynamic/private";
import { verify } from "@node-rs/argon2";
import type { Cookies } from "@sveltejs/kit";

import { PASSWORD_HASH } from "$lib/data";
import { serveFile } from "$lib/server/serve";

export async function GET({ cookies, params, request }) {
    const prefix = resolve(env.FILM_STORAGE);
    const filePath = resolve(join(prefix, params.uid));

    // Prevent path traversal attacks
    if (!filePath.startsWith(prefix + sep) && filePath !== prefix) {
        return new Response("Not Found", { status: 404 });
    }

    // Very simple authenticatino
    if (filePath.toLowerCase().includes("croatia") && !(await verifyAccess(cookies))) {
        return new Response("Unauthorized", { status: 401 });
    }

    return await serveFile(filePath, {
        request,
        contentType: "video/mp4",
    });
}

async function verifyAccess(cookies: Cookies): Promise<boolean> {
    const key = cookies.get("session_key");

    if (!key) {
        return false;
    }

    return await verify(PASSWORD_HASH, key);
}
