<script>
    import { TypeWriter } from "svelte-typewrite";

    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import PageTitle from "$lib/components/layout/PageTitle.svelte";
    import { PROJECTS } from "$lib/data.js";
</script>

<main class="grow">
    <div class="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <PageTitle
            description="A selection of projects focusing on robotics, control systems, and embedded software. Includes work from my time at EPFL and various industrial internships."
        >
            {#snippet title()}
                <TypeWriter
                    texts={["Random proje", "Engineering Log"]}
                    repeat={1}
                    afterTyped={{ wait: 400 }}
                    afterDeleted={{ wait: 500 }}
                    endState={{ text: "typed", caret: "blink" }}
                    blinkDuration={1200}
                />
            {/snippet}
        </PageTitle>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            {#each PROJECTS as project}
                <ProjectCard {project} />
            {/each}
        </div>
    </div>
</main>
