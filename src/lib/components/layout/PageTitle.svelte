<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title: string | Snippet;
        description: string;
    }

    let { title, description }: Props = $props();
</script>

<div class="mb-20 border-b border-stone-300 dark:border-stone-700 pb-8">
    <h1 class="font-serif font-medium text-4xl md:text-6xl text-stone-900 mb-6 dark:text-stone-100">
        {#if typeof title === "string"}
            {title}
        {:else}
            {@render title()}
        {/if}
    </h1>

    <p class="text-stone-600 text-lg max-w-2xl leading-relaxed font-sans dark:text-stone-400">
        {description}
    </p>
</div>
