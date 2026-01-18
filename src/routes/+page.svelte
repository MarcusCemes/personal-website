<script lang="ts">
    import ArrowRightIcon from "phosphor-icons-svelte/IconArrowRightBold.svelte";
    import FilmReelIcon from "phosphor-icons-svelte/IconFilmReelFill.svelte";
    import FlaskIcon from "phosphor-icons-svelte/IconFlaskFill.svelte";

    import { resolve } from "$app/paths";
    import HomeCard from "$lib/components/HomeCard.svelte";
    import BlobBackground from "$lib/components/layout/BlobBackground.svelte";
    import { PROJECTS } from "$lib/data.js";
</script>

<main class="grow">
    <div
        class="absolute left-0 top-20 md:top-0 w-full h-[50svh] md:h-[80svh] z-10 pointer-events-none"
    >
        <BlobBackground />
    </div>

    <div class="relative z-10 max-w-5xl mx-auto px-6 pt-32 md:pt-48 pb-20">
        <section class="mb-32 relative">
            <p class="text-stone-500 font-medium mb-6 tracking-wide uppercase text-sm font-sans">
                MSc Robotics @ EPFL &nbsp;•&nbsp; Switzerland
            </p>

            <!-- <h1
                class="font-serif font-medium text-5xl md:text-7xl text-stone-900 leading-[1.1] mb-8"
            >
                Orchestrating code for <br /><span class="italic text-stone-600">physical</span> systems.
            </h1>

            <p class="text-xl text-stone-600 max-w-2xl leading-relaxed mb-10 font-sans">
                I'm a robotics engineer and and software developer with over 10 years of experience.
                I specialise in Rust, TypeScript and Python to build robust tools for research,
                automation and the web.
            </p> -->

            <!-- <h1
                class="font-serif font-medium text-5xl md:text-7xl text-stone-900 leading-[1.1] mb-8"
            >
                Building systems at the intersection of <span class="italic text-stone-600"
                    >code</span
                >
                and <span class="italic text-stone-600">machines</span>
            </h1>
             -->

            <h1
                class="font-serif font-medium text-5xl md:text-7xl text-stone-900 leading-[1.1] mb-8"
            >
                Practicing the craft of <span class="italic text-stone-600">software</span> for machines
            </h1>

            <!-- <p class="text-xl text-stone-600 max-w-2xl leading-relaxed mb-10 font-sans">
                I’m Marcus, a robotics engineer and developer with a background in building systems
                that bridge code and hardware. From robotic arms and embedded protocols to
                simulations and experimental projects, this site is a collection of things I’ve
                worked on and ideas I’m interested in.
            </p> -->

            <p class="text-xl text-stone-600 max-w-2xl leading-relaxed mb-10 font-sans">
                I design and build software for systems that move, communicate, and occasionally
                misbehave. My background is in robotics and systems programming, with interests
                spanning embedded software, simulation, and game-based experimentation. This site is
                a quiet overview of my work, interests, and the projects I’ve been exploring lately.
            </p>

            <div class="flex flex-wrap gap-4 font-sans">
                <a
                    class="px-6 py-3 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-700 transition-colors flex items-center gap-2"
                    href={resolve("/projects")}
                >
                    <FlaskIcon class="size-5" />
                    Projects
                </a>

                <a
                    class="px-6 py-3 bg-white text-stone-800 border border-stone-200 rounded-lg font-medium hover:border-stone-400 transition-colors flex items-center gap-2"
                    href={resolve("/films")}
                >
                    <FilmReelIcon class="size-5" />
                    Filmography
                </a>
            </div>
        </section>

        <section>
            <div class="flex justify-between items-end mb-12 border-b border-stone-200 pb-4">
                <h2 class="text-3xl font-serif text-stone-900">Selected Work</h2>
                <a
                    class="text-stone-500 hover:text-stone-900 text-sm font-medium flex items-center gap-2 font-sans"
                    href={resolve("/projects")}>View Index <ArrowRightIcon /></a
                >
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <HomeCard project={PROJECTS[0]} />
                <HomeCard project={PROJECTS[1]} />
            </div>
        </section>
    </div>
</main>
