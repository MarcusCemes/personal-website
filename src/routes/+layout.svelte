<script lang="ts">
    import "@fontsource-variable/lora";
    import "@fontsource-variable/outfit";

    import { page } from "$app/state";
    import favicon from "$lib/assets/favicon.png";
    import Footer from "$lib/components/layout/Footer.svelte";
    import Header from "$lib/components/layout/Header.svelte";

    import "./layout.css";

    let { children } = $props();

    let dark = $derived(page.url.pathname.startsWith("/films"));
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div
    class:dark
    class="flex flex-col min-h-screen font-sans antialiased transition-colors duration-300 bg-stone-50 text-stone-800 selection:bg-stone-200 selection:text-stone-900 dark:bg-stone-900 dark:text-stone-200 dark:selection:bg-stone-800 dark:selection:text-stone-100"
>
    <Header />
    {@render children()}
    <Footer />
</div>
