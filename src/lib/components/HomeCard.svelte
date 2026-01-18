<script lang="ts">
    import type { Project } from "$lib/data.js";

    import ParallaxImage from "./ParallaxImage.svelte";

    interface Props {
        project: Project;
    }

    let { project }: Props = $props();
</script>

<a class="group block" href="/projects/{project.id}">
    <ParallaxImage
        alt={project.title}
        class="rounded-xl mb-5 aspect-16/10"
        src={project.imageUrl}
    />

    <h3 class="text-xl font-serif text-stone-900 mb-2">
        {project.title}
    </h3>

    <p class="text-stone-500 text-base leading-relaxed font-sans">
        {project.shortDescription}
    </p>

    <div class="mt-3 flex gap-2 font-sans">
        {#each project.tags.slice(0, 4) as tag}
            <span
                class="text-xs text-stone-400 font-mono border border-stone-200 px-2 py-0.5 rounded"
                >{tag}</span
            >
        {/each}
    </div>
</a>
