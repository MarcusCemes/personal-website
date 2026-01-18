<script lang="ts">
    import { marked } from "marked";
    import ArrowLeftIcon from "phosphor-icons-svelte/IconArrowLeftRegular.svelte";
    import ArrowUpRightIcon from "phosphor-icons-svelte/IconArrowUpRightRegular.svelte";
    import FilePdfIcon from "phosphor-icons-svelte/IconFilePdfRegular.svelte";
    import GithubLogoIcon from "phosphor-icons-svelte/IconGithubLogoRegular.svelte";
    import GlobeIcon from "phosphor-icons-svelte/IconGlobeRegular.svelte";
    import LinkIcon from "phosphor-icons-svelte/IconLinkRegular.svelte";
    import ScrollIcon from "phosphor-icons-svelte/IconScrollRegular.svelte";
    import type { Component } from "svelte";
    import { TypeWriter } from "svelte-typewrite";

    import type { ProjectLink } from "$lib/data.js";

    let { data } = $props();

    let { project } = $derived(data);

    let description = $derived(marked.parse(project.fullDescription));

    let texts = $derived(
        data.project.titleAlt ? [data.project.titleAlt, data.project.title] : [data.project.title],
    );

    function getLinkIcon(type: ProjectLink["type"]): Component {
        switch (type) {
            case "github":
                return GithubLogoIcon;

            case "website":
                return GlobeIcon;

            case "pdf":
                return FilePdfIcon;

            case "publication":
                return ScrollIcon;

            default:
                return LinkIcon;
        }
    }
</script>

<div class="max-w-7xl mx-auto px-6 py-24">
    <div class="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-24">
        <!-- Left Column -->
        <div class="flex flex-col gap-8">
            <!-- Navigation -->
            <a
                href="/projects"
                class="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium"
            >
                <ArrowLeftIcon class="size-4" /> Back to Index
            </a>

            <div class="flex flex-col gap-8">
                <!-- Header -->
                <div class="flex flex-col gap-6">
                    <h1 class="font-serif text-4xl md:text-6xl text-stone-900 leading-tight">
                        <TypeWriter
                            afterTyped={{ wait: 200 }}
                            blinkDuration={1200}
                            endState={{ caret: "blink", text: "typed" }}
                            repeat={1}
                            {texts}
                        />
                    </h1>

                    <p class="text-xl text-stone-600 leading-relaxed">
                        {project.shortDescription}
                    </p>
                </div>

                <!-- Specs Grid -->
                <div class="grid grid-cols-2 gap-x-4 gap-y-8 py-8 border-y border-stone-200">
                    <div>
                        <h3 class="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
                            Role
                        </h3>

                        <p class="text-stone-900 font-medium">{project.role}</p>
                    </div>

                    <div>
                        <h3 class="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
                            Timeline
                        </h3>

                        <p class="text-stone-900 font-medium">{project.date}</p>
                    </div>
                    <div class="col-span-2">
                        <h3 class="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">
                            Tech Stack
                        </h3>

                        <div class="flex flex-wrap gap-2">
                            {#each project.tags as tag}
                                <span
                                    class="px-2 py-1 bg-stone-100 border border-stone-200 rounded text-xs font-mono text-stone-600"
                                >
                                    {tag}
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                {#if project.links.length > 0}
                    <div class="flex flex-col gap-3">
                        {#each project.links as link}
                            {@const Icon = getLinkIcon(link.type)}
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="group flex items-center justify-between px-6 py-4 bg-stone-900 text-stone-50 rounded-xl hover:bg-stone-800 transition-all shadow-lg shadow-stone-200/50"
                            >
                                <div class="flex items-center gap-3">
                                    <Icon class="size-4" />
                                    <span class="font-medium">{link.label}</span>
                                </div>

                                <ArrowUpRightIcon
                                    class="size-4 text-stone-400 group-hover:text-white transition-colors"
                                />
                            </a>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>

        <!-- Right Column: Visuals & Detail -->
        <div class="flex flex-col gap-6 md:gap-12">
            <!-- Main Visual -->
            <div
                class="rounded-2xl overflow-hidden shadow-2xl shadow-stone-200 bg-stone-100 border border-stone-100 aspect-4/3"
            >
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    class="w-full h-full object-cover"
                />
            </div>

            <!-- Content Body -->
            <div class="prose prose-stone max-w-none text-stone-600 leading-loose">
                {@html description}
            </div>

            <!-- Gallery -->
            {#if project.gallery}
                <div class="grid md:grid-cols-2 gap-4">
                    {#each data.project.gallery as imageUrl}
                        <img
                            alt="Gallery image for {data.project.title}"
                            src={imageUrl}
                            class="w-full rounded-lg object-cover border border-stone-100"
                        />
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>
