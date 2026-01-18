<script lang="ts">
    import { marked } from "marked";
    import ArrowLeftIcon from "phosphor-icons-svelte/IconArrowLeftRegular.svelte";
    import ArrowRightIcon from "phosphor-icons-svelte/IconArrowRightRegular.svelte";
    import CalendarIcon from "phosphor-icons-svelte/IconCalendarBlankFill.svelte";
    import ClockIcon from "phosphor-icons-svelte/IconClockFill.svelte";
    import KeyIcon from "phosphor-icons-svelte/IconKeyFill.svelte";
    import LockIcon from "phosphor-icons-svelte/IconLockSimpleFill.svelte";
    import MapPinIcon from "phosphor-icons-svelte/IconMapPinFill.svelte";
    import TagIcon from "phosphor-icons-svelte/IconTagFill.svelte";
    import WarningCircleIcon from "phosphor-icons-svelte/IconWarningCircleRegular.svelte";

    import { resolve } from "$app/paths";

    import { unlock } from "./film.remote.js";

    let { data } = $props();

    const { film, locked, other } = $derived(data);

    let description = $derived(marked.parse(film.description));
    let showFilm = $derived(!locked || unlock.result?.ok);
    let isError = $derived(unlock.result?.ok === false);
</script>

{#if !showFilm}
    <div class="flex-1 flex flex-col justify-center items-center">
        <a
            class="absolute top-8 left-8 inline-flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-sm font-medium"
            href={resolve("/films")}
        >
            <ArrowLeftIcon class="size-4" /> Back to Films
        </a>

        <div
            class="max-w-md w-full bg-stone-900/50 border border-stone-800 p-8 rounded-2xl backdrop-blur-sm"
        >
            <div class="flex flex-col items-center text-center">
                <div
                    class="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                >
                    <LockIcon class="size-8 text-stone-400" />
                </div>

                <h1 class="text-2xl font-serif text-white mb-2">{film.title}</h1>
                <p class="text-stone-400 mb-8 font-sans text-sm">
                    This film is part of a protected collection. <br />Please enter the password to
                    view.
                </p>

                <form {...unlock} class="relative w-full">
                    <div class="relative flex items-center">
                        <KeyIcon class="size-4 absolute left-3 text-stone-500" />

                        <!-- svelte-ignore a11y_autofocus -->
                        <input
                            {...unlock.fields.key.as("password")}
                            autofocus
                            placeholder="Enter password"
                            class={`w-full bg-stone-950 border ${isError ? "border-red-500 focus:border-red-500" : "border-stone-700 focus:border-stone-500"} rounded-xl py-3 pl-10 pr-12 text-white placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-500 transition-all`}
                        />

                        <button
                            {...unlock.fields.action.as("submit", "value")}
                            class="absolute right-1.5 top-1.5 bottom-1.5 bg-white text-stone-950 px-3 rounded-lg font-medium hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ArrowRightIcon class="size-4" />
                        </button>
                    </div>

                    {#if isError}
                        <div
                            class="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-2 text-red-400 text-xs"
                        >
                            <WarningCircleIcon class="size-4" />
                            <span>Incorrect password</span>
                        </div>
                    {/if}
                </form>
            </div>
        </div>
    </div>
{:else}
    <div class="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <!-- Back Navigation -->
        <a
            href={resolve("/films")}
            class="inline-flex items-center gap-2 text-stone-400 hover:text-white mb-8 transition-colors text-sm font-medium"
        >
            <ArrowLeftIcon class="size-4" /> Back to Films
        </a>

        <!-- Video Player Section -->
        <div class="mb-12">
            <div
                class="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl shadow-black/50 relative border border-stone-800"
            >
                {#if film.src}
                    <iframe
                        src={film.src}
                        title={film.title}
                        class="w-full h-full bg-white"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                {:else}
                    <!-- svelte-ignore a11y_media_has_caption -->
                    {#key film.id}
                        <video class="w-full h-full object-contain" controls>
                            <source src="/films/{film.id}/stream" type="video/mp4" />
                        </video>
                    {/key}
                {/if}
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Main Info -->
            <div class="lg:col-span-2">
                <h1 class="font-serif text-4xl md:text-5xl text-white mb-6">{film.title}</h1>
                <div
                    class="flex flex-wrap gap-6 text-sm text-stone-400 font-mono mb-8 border-b border-stone-800 pb-8"
                >
                    <div class="flex items-center gap-2">
                        <CalendarIcon class="size-4" />
                        <span>{film.year}</span>
                    </div>

                    <div class="flex items-center gap-2">
                        <ClockIcon class="size-4" />
                        <span>{film.duration}</span>
                    </div>

                    <div class="flex items-center gap-2 capitalize">
                        <TagIcon class="size-4" />
                        <span>{film.category}</span>
                    </div>

                    <div class="flex items-center gap-2 capitalize">
                        <MapPinIcon class="size-4" />
                        <span>{film.location}</span>
                    </div>

                    {#if film.highRes}
                        <div class="flex items-center gap-2">
                            <span
                                class="px-2 py-0.5 bg-stone-800 rounded text-xs font-mono text-stone-400"
                                >4K Available</span
                            >
                        </div>
                    {/if}
                </div>

                <div
                    class="prose prose-invert prose-lg text-stone-300 font-sans leading-relaxed max-w-none"
                >
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html description}

                    {#if film.imageAttribution}
                        <p class="text-stone-500 text-xs mt-6">
                            <em>Image Attribution: {film.imageAttribution}</em>
                        </p>
                    {/if}
                </div>
            </div>

            <!-- Sidebar / More Films -->
            <div class="space-y-8">
                <h3 class="text-xs font-bold tracking-widest text-stone-500 uppercase">
                    You Might Also Like
                </h3>
                <div class="space-y-6">
                    {#each other as film (film.id)}
                        <a href={resolve(`/films/${film.id}`)} class="group block">
                            <div
                                class="aspect-video bg-stone-900 rounded-lg overflow-hidden mb-3 relative"
                            >
                                <img
                                    src={film.image}
                                    alt={film.title}
                                    class="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-300"
                                />
                                <div
                                    class="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 rounded text-[10px] text-white font-mono"
                                >
                                    {film.duration}
                                </div>
                            </div>
                            <h4
                                class="text-stone-200 font-medium group-hover:text-white transition-colors"
                            >
                                {film.title}
                            </h4>
                            <p class="text-stone-500 text-xs mt-1">{film.year}</p>
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    </div>
{/if}
