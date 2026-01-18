import { error } from "@sveltejs/kit";

import { ALL_FILMS } from "$lib/data.js";

export function load({ params }) {
    const { uid } = params;

    const film = ALL_FILMS.find((p) => p.id === uid);

    if (!film) {
        return error(404, "Film not found");
    }

    const locked = film.category === "croatia";
    const other = ALL_FILMS.filter((p) => p.id !== uid).slice(0, 3);

    return { film, locked, other };
}
