<script lang="ts">
</script>

<footer class=" border-t border-stone-200 dark:border-stone-700 py-12 mt-auto">
    <div
        class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6"
    >
        <div class="text-stone-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Marcus Cemes
        </div>

        <div class="flex gap-8 text-stone-500 text-sm font-sans">
            {@render link("GitHub", "https://github.com/MarcusCemes")}
            {@render link("LinkedIn", "https://www.linkedin.com/in/marcus-cemes/")}
        </div>
    </div>
</footer>

{#snippet link(text: string, href: string)}
    <a class="hover:text-stone-900 dark:hover:text-stone-400 transition-colors" {href}>{text}</a>
{/snippet}
