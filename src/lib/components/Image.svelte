<script lang="ts">
    import type { HTMLImgAttributes } from "svelte/elements";
    import { fade } from "svelte/transition";

    interface Props extends HTMLImgAttributes {}

    let { class: className, ...rest }: Props = $props();

    let element = $state<HTMLImageElement>();
    let errored = $state(false);
    let loaded = $state(false);

    let hidden = $derived(!loaded || errored);

    $effect.pre(() => {
        if (!element) {
            return;
        }

        if (element.dataset.errored !== undefined) {
            errored = true;
        } else if (element.complete) {
            loaded = true;
        }
    });

    function onload() {
        loaded = true;
    }

    function onerror() {
        errored = true;
    }
</script>

{#if hidden}
    <div
        out:fade={{ delay: 500, duration: 0 }}
        class="absolute inset-0 bg-stone-200 dark:bg-stone-700 animate-pulse"
    ></div>
{/if}

<img
    {...rest}
    bind:this={element}
    class="pointer-events-none transition-opacity duration-200 ease-in {className}"
    class:opacity-0={hidden}
    {onload}
    {onerror}
/>
