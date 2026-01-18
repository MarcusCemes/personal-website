<script lang="ts">
    import PlayIcon from "phosphor-icons-svelte/IconPlayFill.svelte";

    import type { FeaturedFilm } from "$lib/data";

    import ParallaxImage from "../ParallaxImage.svelte";

    interface Props {
        film: FeaturedFilm;
    }

    let { film }: Props = $props();
</script>

<a
    class="group relative aspect-video rounded-2xl shadow-lg overflow-hidden"
    href="/films/{film.id}"
>
    <ParallaxImage alt={film.title} class="w-full h-full " src={film.image} />

    <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
        <div
            class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
            <PlayIcon class="text-white size-8" />
        </div>
    </div>

    <div
        class="absolute bottom-4 right-4 px-2 py-1 bg-black/70 rounded text-xs text-white font-mono"
    >
        {film.duration}
    </div>

    <div class="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-black/90 to-transparent">
        <h3 class="text-white font-serif text-xl mb-1">{film.title}</h3>
        <div class="flex items-center gap-2 text-stone-300 text-xs uppercase tracking-widest">
            <span>{film.year}</span><span class="w-1 h-1 bg-stone-300 rounded-full"></span><span
                >{film.type}</span
            >
        </div>
    </div>
</a>
