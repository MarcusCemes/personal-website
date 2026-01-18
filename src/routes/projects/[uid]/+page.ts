import { error } from "@sveltejs/kit";

import { PROJECTS } from "$lib/data.js";

export function load({ params }) {
    const { uid } = params;

    const project = PROJECTS.find((p) => p.id === uid);

    if (!project) {
        return error(404, "Project not found");
    }

    return { project };
}
