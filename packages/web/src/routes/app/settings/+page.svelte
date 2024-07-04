<script lang="ts">
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import { Account, Billing, type Tab } from '$components/settings';
    import { FullScreen, Tabs } from '$lib/ui';
    import { changeSearchParams } from '$utils/change-search-params';
    import { page } from '$app/stores';
    import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
    import IconUser from "@tabler/icons-svelte/IconUser.svelte";
    import IconReceipt2 from "@tabler/icons-svelte/IconReceipt2.svelte";

    // The view will considerably differ
    // between desktop and mobile users.
    let clientWidth: number;
    let tabs: Tab[] = [
        {
            icon: IconUser,
            label: "Général",
            description: "Voir et modifier mon profil",
            slug: "my-profile",
            component: Account
        },
        {
            icon: IconReceipt2,
            label: "Paiements",
            description: "Voir mon plan actuel",
            slug: "billing",
            component: Billing
        }
    ];

    $: currentTab = $page.url.searchParams.get("tab");

    const getComponentBySlug = (slug: string) => {
        return tabs.find(tab => tab.slug === slug)!.component;
    }
</script>

<svelte:head>
    <title>Paramètres - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Prends le contrôle de ton expérience et configure tes paramètres pour une utilisation optimale.
        Inscris-toi et gère ta vie étudiante comme un pro !"
    />
</svelte:head>

<main class="relative w-full h-full flex flex-col justify-start items-start px-5 md:py-5 gap-5 md:gap-20" bind:clientWidth>
    <h1>Mon compte</h1>
    {#if clientWidth > 768}
        <Tabs {tabs} on:change={(event) => changeSearchParams("tab", event.detail)} />
    {:else}
        <div class="relative w-full h-full flex flex-col gap-5">
            {#each tabs as { icon, label, description, slug }}
                <button
                    on:click={() => changeSearchParams("tab", slug)}
                    class="relative w-full p-5 flex justify-start items-start gap-5 rounded-lg border border-neutral-100"
                >
                    <div class="relative h-full aspect-square grid place-items-center rounded bg-neutral-50">
                        <svelte:component this={icon} />
                    </div>
                    <div class="relative w-full h-full flex flex-col justify-start items-start gap-[10px]">
                        <h2>{label}</h2>
                        <p class="text-sm text-neutral-500">{description}</p>
                    </div>
                </button>
            {/each}
        </div>
        {#if currentTab}
            {@const component = getComponentBySlug(currentTab)}
            <FullScreen.Modal>
                <header class="relative flex justify-between items-center w-full h-[60px] px-5 z-[100] bg-white">
                    <button class="rounded-full" on:click={() => changeSearchParams("tab", null)}>
                        <IconChevronLeft />
                    </button>
                </header>
                <div class="relative w-full flex-grow flex justify-start items-start px-5 pb-5">
                    <svelte:component this={component} />
                </div>
            </FullScreen.Modal>
        {/if}
    {/if}
</main>
