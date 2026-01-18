<script lang="ts">
    import ListIcon from "phosphor-icons-svelte/IconListRegular.svelte";

    import { page } from "$app/state";

    let scrollY = $state(0);
    let mobileNavOpen = $state(false);

    let expanded = $derived(scrollY > 16 || mobileNavOpen);

    function isActive(href: string) {
        const path = page.url.pathname;

        if (href === "/" && path === "/") {
            return true;
        }

        return href !== "/" && path.startsWith(href);
    }

    function onclick() {
        mobileNavOpen = !mobileNavOpen;
    }
</script>

{#snippet link(text: string, href: string, onclick?: () => void)}
    {@const active = isActive(href)}

    <a
        class="text-sm font-medium font-sans transition-colors duration-200 {active
            ? 'text-stone-900 border-b-2 border-stone-800 dark:text-stone-200 dark:border-stone-200 pb-1'
            : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'}"
        {href}
        {onclick}>{text}</a
    >
{/snippet}

<svelte:window bind:scrollY />

<header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 {expanded
        ? 'py-4 bg-white/90 dark:bg-black/70 backdrop-blur-md shadow-sm'
        : 'py-6 bg-transparent'}"
>
    <div class="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
            aria-current="page"
            class="font-serif text-xl font-bold tracking-tight text-stone-900 dark:text-stone-200"
            href="/">Marcus<span class="text-stone-400">.Cemes</span></a
        >

        <nav class="hidden md:flex items-center gap-8">
            {@render link("Home", "/")}
            {@render link("Projects", "/projects")}
            {@render link("Films", "/films")}
            {@render link("About", "/about")}
        </nav>

        <button class="md:hidden" {onclick}>
            <ListIcon class="size-5" />
        </button>
    </div>

    {#if mobileNavOpen}
        <nav class="md:hidden mt-4 p-4 pb-0 flex flex-col gap-4">
            {@render link("Home", "/", onclick)}
            {@render link("Projects", "/projects", onclick)}
            {@render link("Films", "/films", onclick)}
            {@render link("About", "/about", onclick)}
        </nav>
    {/if}
</header>
