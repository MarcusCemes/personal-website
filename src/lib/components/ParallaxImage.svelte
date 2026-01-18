<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    import { ParallaxController } from "$lib/hooks/parallax.svelte.js";

    import Image from "./Image.svelte";

    interface Props extends HTMLAttributes<HTMLDivElement> {
        alt: string;
        src: string;
        margin?: number;
    }

    let { alt, class: className, src, margin = 4, ...rest }: Props = $props();

    const parallax = new ParallaxController(margin);

    $effect(() => {
        parallax.margin = margin;
    });
</script>

<div {...rest} class="relative overflow-hidden {className}" bind:this={parallax.element}>
    <div
        class="absolute left-0 w-full will-change-transform"
        style:top="-{margin}rem"
        style:height="calc(100% + {margin}rem * 2)"
        style:opacity={parallax.opacity}
        style:transform="translateY({parallax.y}rem)"
    >
        <Image {alt} class="w-full h-full object-cover" {src} />
    </div>
</div>
