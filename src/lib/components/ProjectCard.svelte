<script lang="ts">
    import ArrowUpRightIcon from "phosphor-icons-svelte/IconArrowUpRightRegular.svelte";

    import ParallaxImage from "$lib/components/ParallaxImage.svelte";
    import type { Project } from "$lib/data.js";

    interface Props {
        project: Project;
    }

    let { project }: Props = $props();
</script>

<a
    class="group relative bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300"
    href="/projects/{project.id}"
>
    <ParallaxImage alt={project.title} class="aspect-4/3" src={project.imageUrl} />

    <div class="p-6">
        <div class="flex justify-between items-start mb-3">
            <h3
                class="font-serif text-xl font-semibold text-stone-900 group-hover:text-sage-700 transition-colors"
            >
                {project.title}
            </h3>

            <span
                class="p-2 bg-stone-100 rounded-full text-stone-500 group-hover:bg-stone-800 group-hover:text-white transition-all"
            >
                <ArrowUpRightIcon class="size-4" />
            </span>
        </div>

        <p class="text-stone-600 text-sm mb-4 leading-relaxed line-clamp-2">
            {project.shortDescription}
        </p>

        <div class="flex flex-wrap gap-2">
            {#each project.tags as tag}
                <span
                    class="px-3 py-1 bg-stone-100 text-stone-500 text-xs font-medium rounded-full"
                >
                    {tag}
                </span>
            {/each}
        </div>
    </div>
</a>
