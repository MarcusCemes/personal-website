<script lang="ts">
    import type { Film } from "$lib/data.js";

    import ParallaxImage from "../ParallaxImage.svelte";

    interface Props {
        film: Film;
    }

    let { film }: Props = $props();
</script>

<a class="group" href="/films/{film.id}">
    <ParallaxImage
        alt={film.title}
        class="aspect-video rounded-lg mb-3 bg-stone-900"
        src={film.image}
    />

    <div class="flex justify-between items-start">
        <div>
            <h3 class="text-stone-300 text-sm font-medium group-hover:text-white transition-colors">
                {film.title}
            </h3>
            <p class="text-stone-600 text-xs mt-1">{film.year}</p>
        </div>
        <span class="text-stone-600 text-xs font-mono">{film.duration}</span>
    </div>
</a>
