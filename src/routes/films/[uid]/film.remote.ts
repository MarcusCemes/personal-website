import { verify } from "@node-rs/argon2";
import * as v from "valibot";

import { dev } from "$app/environment";
import { form, getRequestEvent } from "$app/server";
import { PASSWORD_HASH } from "$lib/data";

export const unlock = form(v.object({ key: v.string() }), async ({ key }) => {
    const ok = await verify(PASSWORD_HASH, key);

    if (ok) {
        const { cookies } = getRequestEvent();

        cookies.set("session_key", key, {
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
            secure: !dev,
            sameSite: "lax",
        });
    }

    return { ok };
});
