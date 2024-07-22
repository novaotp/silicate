<script lang="ts">
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import { Account, Billing, type Tab } from '$components/settings';
    import { FullScreen, Tabs } from '$lib/ui';
    import { changeSearchParams } from '$utils/change-search-params';
    import { page } from '$app/stores';
    import IconChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
    import IconUser from '@tabler/icons-svelte/icons/user';
    import IconReceipt2 from '@tabler/icons-svelte/icons/receipt-2';

    let tabs: Tab[] = [
        {
            icon: IconUser,
            label: 'Général',
            description: 'Voir et modifier mon profil',
            slug: 'my-profile',
            component: Account
        },
        {
            icon: IconReceipt2,
            label: 'Paiements',
            description: 'Voir mon plan actuel',
            slug: 'billing',
            component: Billing
        }
    ];

    $: currentTab = $page.url.searchParams.get('tab');

    const getComponentBySlug = (slug: string) => {
        return tabs.find((tab) => tab.slug === slug)!.component;
    };
</script>

<svelte:head>
    <title>Paramètres - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Prends le contrôle de ton expérience et configure tes paramètres pour une utilisation optimale.
        Inscris-toi et gère ta vie étudiante comme un pro !"
    />
</svelte:head>

<main class="relative w-full h-full flex flex-col justify-start items-start px-5 md:py-5 gap-5 md:gap-20">
    <h1 class="dark:text-neutral-50">Mon compte</h1>
    <div class="hidden md:block w-full h-full">
        <Tabs {tabs} on:change={(event) => changeSearchParams('tab', event.detail)} />
    </div>
    <div class="block w-full md:hidden">
        <div class="relative w-full h-full flex flex-col gap-5">
            {#each tabs as { icon, label, description, slug }}
                <button
                    on:click={() => changeSearchParams('tab', slug)}
                    class="relative w-full p-5 flex justify-start items-start gap-5 rounded-lg border border-neutral-100 dark:border-none dark:bg-neutral-900"
                >
                    <div class="relative h-full aspect-square grid place-items-center rounded bg-neutral-50 dark:bg-neutral-800">
                        <svelte:component this={icon} class="dark:text-neutral-50" />
                    </div>
                    <div class="relative w-full h-full flex flex-col justify-start items-start gap-[10px]">
                        <h2 class="dark:text-neutral-50">{label}</h2>
                        <p class="text-sm text-neutral-500 dark:text-neutral-300">{description}</p>
                    </div>
                </button>
            {/each}
        </div>
        {#if currentTab}
            {@const component = getComponentBySlug(currentTab)}
            <FullScreen.Modal>
                <header class="relative flex justify-between items-center w-full h-[60px] px-5 z-[100] bg-white dark:bg-neutral-950">
                    <button class="rounded-full" on:click={() => changeSearchParams('tab', null)}>
                        <IconChevronLeft class="dark:text-neutral-50" />
                    </button>
                </header>
                <div class="relative w-full flex-grow flex justify-start items-start px-5 pb-5">
                    <svelte:component this={component} />
                </div>
            </FullScreen.Modal>
        {/if}
    </div>
</main>
