<script lang="ts" module>
    interface Experience {
        title: string;
        subtitle: string;
        date: string;
        description: string;
    }

    interface Education {
        title: string;
        subtitle: string;
        date: string;
    }

    const EXPERIENCE: Experience[] = [
        {
            title: "Data & AI Master Trainee",
            subtitle: "Nestlé R&D",
            date: "2024 - 2025",
            description:
                "Applied data science and artificial intelligence techniques to support and accelerate research and development initiatives.",
        },
        {
            title: "Student Assistant",
            subtitle: "EPFL Center of MicroNanoTechnology (CMi)",
            date: "2021 - 2024",
            description:
                "Designed and developed full-stack applications to manage and promote annual events, including interactive poster design tools.",
        },
        {
            title: "Research Assistant",
            subtitle: "EPFL Swiss Plasma Center",
            date: "2022 - 2024",
            description:
                "Developed high-frequency magnetic coils using photolithography, alongside custom Rust and C++ software for operation in extreme environments.",
        },
    ];

    const EDUCATION: Education[] = [
        {
            title: "MSc in Robotics",
            subtitle: "École Polytechnique Fédérale de Lausanne (EPFL)",
            date: "2025",
        },
        {
            title: "BSc in Microengineering",
            subtitle: "École Polytechnique Fédérale de Lausanne (EPFL)",
            date: "2022",
        },
        {
            title: "Gymnase de Nyon",
            subtitle: "Swiss Matura",
            date: "2019",
        },
    ];

    const SKILLS = {
        Languages: ["Rust", "TypeScript", "Python", "C++", "Elixir"],
        "Robotics & Hardware": ["Control Theory", "Microfabrication", "ROS2", "Embedded Systems"],
        Development: ["Svelte", "Linux", "Docker", "PostgreSQL"],
        Creative: ["DaVinci Resolve", "Lightroom", "Blender"],
    };
</script>

<script lang="ts">
    import ReadCvIcon from "phosphor-icons-svelte/IconReadCvLogoRegular.svelte";

    import profilePicture from "$lib/assets/me.avif";
    import Image from "$lib/components/Image.svelte";

    const CV_URL: string = "/files/Curriculum Vitae.pdf";
</script>

<main class="grow">
    <div class="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div>
            <section class="mb-16 border-b border-stone-200 pb-12">
                <div class="flex flex-col md:flex-row gap-12 items-center">
                    <div
                        class="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-lg"
                    >
                        <Image
                            alt="Profile"
                            class="w-full h-full object-cover opacity-0"
                            src={profilePicture}
                        />
                    </div>

                    <div class="text-center md:text-left">
                        <h1 class="font-serif text-4xl text-stone-900 mb-4">About Me</h1>

                        <p class="mb-4 text-stone-600 leading-relaxed">
                            I’m Marcus Cemes, a robotics engineer and self-employed developer based
                            in Switzerland. I recently completed an MSc in Robotics at EPFL,
                            following a BSc in Microengineering.
                        </p>

                        <p class="mb-4 text-stone-600 leading-relaxed">
                            I’ve been programming for over a decade, primarily in TypeScript and
                            Rust. My work often sits where software meets hardware: controlling
                            industrial robots for aerodynamic research, generating micro-scale
                            designs for plasma physics, or building reliable full-stack tools for
                            the web. I’m particularly drawn to systems that must operate under
                            real-world constraints, where correctness and clarity matter.
                        </p>

                        <p class="text-stone-600 leading-relaxed">
                            I care about software that is both dependable and thoughtfully designed.
                        </p>
                    </div>
                </div>
            </section>

            <div class="grid md:grid-cols-3 gap-12">
                <div class="md:col-span-2 space-y-12">
                    <section>
                        <h2 class="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-3">
                            Experience
                            <div class="h-px flex-1 bg-stone-200"></div>
                        </h2>

                        <div class="space-y-8">
                            {#each EXPERIENCE as { title, subtitle, date, description } (title)}
                                {@render experienceItem(title, subtitle, date, description)}
                            {/each}
                        </div>
                    </section>

                    <section>
                        <h2 class="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-3">
                            Education
                            <div class="h-px flex-1 bg-stone-200"></div>
                        </h2>

                        <div class="space-y-8">
                            {#each EDUCATION as { title, subtitle, date } (title)}
                                {@render educationItem(title, subtitle, date)}
                            {/each}
                        </div>
                    </section>
                </div>

                <div class="space-y-12">
                    <section>
                        <h2 class="font-serif text-2xl text-stone-900 mb-6">Skills</h2>
                        <div class="space-y-6">
                            {#each Object.entries(SKILLS) as [title, skills] (title)}
                                {@render skillPills(title, skills)}
                            {/each}
                        </div>
                    </section>

                    <section>
                        <!-- eslint-disable -->
                        <a
                            class="group w-full py-3 bg-stone-200 hover:bg-stone-900 text-stone-900 hover:text-white font-medium rounded-xl transition-all duration-100 flex items-center justify-center gap-3"
                            href={CV_URL}
                            download="Marcus Cemes (CV).pdf"
                        >
                            <ReadCvIcon
                                class="size-5 text-stone-500 group-hover:text-white transition-colors"
                            />
                            Download Resume
                        </a>
                    </section>
                </div>
            </div>
        </div>
    </div>
</main>

{#snippet experienceItem(title: string, subtitle: string, date: string, description: string)}
    <div class="relative pl-6 border-l border-stone-200">
        <div
            class="absolute -left-1.5 top-1.5 w-3 h-3 bg-stone-300 rounded-full border-2 border-stone-50"
        ></div>

        <h3 class="font-medium text-lg text-stone-900">
            {title}
        </h3>

        <div class="text-stone-500 text-sm mb-2 font-mono">
            {subtitle} • {date}
        </div>

        <p class="text-stone-600 leading-relaxed text-sm">
            {description}
        </p>
    </div>
{/snippet}

{#snippet educationItem(title: string, subtitle: string, date: string)}
    <div>
        <h3 class="font-medium text-lg text-stone-900">
            {title}
        </h3>

        <div class="text-stone-500 text-sm font-mono">
            {subtitle} • {date}
        </div>
    </div>
{/snippet}

{#snippet skillPills(title: string, skills: string[])}
    <div>
        <h4 class="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">
            {title}
        </h4>

        <div class="flex flex-wrap gap-2">
            {#each skills as skill (skill)}
                <span
                    class="px-3 py-1 bg-white border border-stone-200 text-stone-600 text-xs rounded-md shadow-sm"
                >
                    {skill}
                </span>
            {/each}
        </div>
    </div>
{/snippet}
