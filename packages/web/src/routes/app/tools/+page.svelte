<script lang="ts">
    import { page } from "$app/stores";
    import PomodoroTimer from "$components/tools/pomodoro-timer/PomodoroTimer.svelte";
    import { FullScreen } from "$lib/ui";
    import IconClock from "@tabler/icons-svelte/icons/clock";
    import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";
    import { changeSearchParams } from "$utils/change-search-params";

    $: currentTool = $page.url.searchParams.get("tool");
    $: currentCategory = $page.url.searchParams.get("category");

    const categories = {
        "time-management": "Gestion du temps"
    }

    const tools = [
        {
            icon: IconClock,
            component: PomodoroTimer,
            category: "time-management",
            label: "Méthode Pomodoro",
            slug: "pomodoro-timer",
            description: "Périodes de travail de 25 minutes pour 5 minutes de pause."
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
    {#if currentTool !== null}
        {@const component = tools.find(t => t.slug === currentTool)?.component}
        <FullScreen.Modal class="h-[calc(100%-80px)] top-20 flex flex-col gap-5 p-5 pt-0">
            <button on:click={() => changeSearchParams("tool", null)} class="flex gap-5">
                <IconChevronLeft />
                <span>Retour</span>
            </button>
            <div class="relative w-full flex-grow">
                <svelte:component this={component} />
            </div>
        </FullScreen.Modal>
    {:else}
        {#each tools.filter(t => currentCategory === null || t.category === currentCategory) as { label, slug, description, icon }}
            <button
                on:click={() => changeSearchParams("tool", slug)}
                class="relative w-full flex items-center gap-5 p-5 rounded-lg border border-neutral-100"
            >
                <div class="relative h-10 aspect-square grid place-items-center bg-neutral-100 rounded">
                    <svelte:component this={icon} />
                </div>
                <div class="relative flex flex-col items-start gap-[10px] text-start">
                    <h2>{label}</h2>
                    <p class="text-sm text-neutral-500">{description}</p>
                </div>
            </button>
        {/each}
    {/if}
</main>
