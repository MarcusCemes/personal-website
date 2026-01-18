<script lang="ts">
    import type { Film } from "$lib/data.js";

    import ParallaxImage from "../ParallaxImage.svelte";

    interface Props {
        film: Film;
    }

    let { film }: Props = $props();
</script>

<a class="group cursor-pointer" href="/films/{film.id}">
    <ParallaxImage
        alt={film.title}
        class="aspect-4/5 rounded-lg mb-3 bg-stone-900"
        src={film.image}
    />

    <h3 class="text-stone-100 font-medium group-hover:text-white">
        {film.title}
    </h3>

    <p class="text-stone-500 text-xs">{film.duration}</p>
</a>
