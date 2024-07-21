<script lang="ts">
    import { page } from "$app/stores";
    import IconClock from "@tabler/icons-svelte/icons/clock";
    import IconMusic from '@tabler/icons-svelte/icons/music';
    import { changeSearchParams } from "$utils/change-search-params";
    import { goto } from "$app/navigation";

    $: currentCategory = $page.url.searchParams.get("category");

    const categories = {
        "time-management": "Gestion du temps",
        "audio": "Audio"
    }

    const tools = [
        {
            icon: IconClock,
            category: "time-management",
            label: "Méthode Pomodoro",
            slug: "pomodoro-timer",
            description: "Périodes de travail de 25 minutes pour 5 minutes de pause."
        },
        {
            icon: IconMusic,
            category: "audio",
            label: "Streaming Audio",
            slug: "audio-streaming",
            description: "Des musiques calmes et relaxantes pour une concentration maximale."
        }
    ];
</script>

<svelte:head>
    <title>Outils prédagogiques - Chalarí</title>
</svelte:head>

<main class="relative w-full h-full flex flex-col gap-5 p-5 pt-0">
    <h1>Outils pédagogiques</h1>
    <div class="flex gap-[10px] overflow-auto">
        <button
            on:click={() => changeSearchParams("category", null)}
            class="px-3 py-2 rounded-lg text-sm {currentCategory === null ? "bg-primary-600 text-white" : "bg-neutral-300 text-neutral-800"}"
        >
            Tout
        </button>
        {#each Object.entries(categories) as [slug, label]}
            <button
                on:click={() => changeSearchParams("category", slug)}
                class="px-3 py-2 rounded-lg text-sm {currentCategory === slug ? "bg-primary-600 text-white" : "bg-neutral-300 text-neutral-800"}"
            >
                {label}
            </button>
        {/each}
    </div>
    {#each tools.filter(t => currentCategory === null || t.category === currentCategory) as { label, slug, description, category, icon }}
        <button
            on:click={() => goto(`/app/tools/${slug}`)}
            class="relative w-full flex items-center gap-5 p-5 rounded-lg border border-neutral-100"
        >
            <div class="relative h-10 aspect-square grid place-items-center bg-neutral-100 rounded">
                <svelte:component this={icon} />
            </div>
            <div class="relative flex flex-col items-start gap-[10px] text-start">
                <div class="flex flex-col">
                    <h3 class="text-xs text-neutral-500">{categories[category]}</h3>
                    <h2>{label}</h2>
                </div>
                <p class="text-sm text-neutral-500">{description}</p>
            </div>
        </button>
    {/each}
</main>
