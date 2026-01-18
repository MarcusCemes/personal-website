<script>
    import LockIcon from "phosphor-icons-svelte/IconLockSimpleFill.svelte";

    import ArchiveFilmCard from "$lib/components/films/ArchiveFilmCard.svelte";
    import FeaturedFilmCard from "$lib/components/films/FeaturedFilmCard.svelte";
    import VerticalFilmCard from "$lib/components/films/VerticalFilmCard.svelte";
    import PageTitle from "$lib/components/layout/PageTitle.svelte";
    import { ARCHIVE_FILMS, CROATIA_FILMS, FEATURED_FILMS } from "$lib/data.js";
</script>

<main class="grow">
    <div class="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <PageTitle
            title="Visual Logs"
            description="A collection of video essays, travel diaries, and experimental footage. Shot mostly on handheld cinema cameras."
        />

        <section class="mb-24">
            <h2 class="text-xs font-bold tracking-widest text-stone-500 uppercase mb-8">
                Featured Selection
            </h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {#each FEATURED_FILMS as film (film.id)}
                    <FeaturedFilmCard {film} />
                {/each}
            </div>
        </section>

        <section class="mb-24">
            <div class="flex items-baseline gap-6 mb-8">
                <h2 class="text-3xl font-serif text-white">Croatia</h2>
                <span class="inline-flex items-center gap-2 text-stone-500 font-mono text-sm">
                    <LockIcon class="size-4" />
                    Private Collection
                </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {#each CROATIA_FILMS as film (film.id)}
                    <VerticalFilmCard {film} />
                {/each}
            </div>
        </section>

        <section>
            <h2 class="text-xs font-bold tracking-widest text-stone-500 uppercase mb-8">Archive</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {#each ARCHIVE_FILMS as film (film.id)}
                    <ArchiveFilmCard {film} />
                {/each}
            </div>
        </section>
    </div>
</main>
