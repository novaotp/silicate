<script lang="ts">
    import MenuIcon from '@tabler/icons-svelte/IconMenu.svelte';
    import CloseIcon from '@tabler/icons-svelte/IconX.svelte';
    import MemoIcon from '@tabler/icons-svelte/IconLayersSubtract.svelte';
    import GradeIcon from '@tabler/icons-svelte/IconStars.svelte';
    import IconHome from '@tabler/icons-svelte/IconHome.svelte';
    import IconLogout from '@tabler/icons-svelte/IconLogout.svelte';
    import TaskIcon from '@tabler/icons-svelte/IconChecklist.svelte';
    import IconSettings from '@tabler/icons-svelte/IconSettings.svelte';
    import IconMenu2 from '@tabler/icons-svelte/IconMenu2.svelte';
    import Item from './Item.svelte';
    import DesktopItem from './DesktopItem.svelte';
    import { FullScreen, Card } from "$lib/ui";

    let showMenu: boolean = false;
</script>

<div class="md:hidden block text-neutral-950">
    <nav class="relative w-full h-[60px] flex justify-start px-5 py-[10px]">
        <button on:click={() => (showMenu = true)} class="relative h-full flex justify-center items-center">
            <MenuIcon />
        </button>
    </nav>
    {#if showMenu}
        <FullScreen.Backdrop class="flex justify-center items-center" on:click={() => (showMenu = false)}>
            <Card class="mx-auto w-[calc(100%-40px)] flex flex-col gap-4" options={{ y: 50 }}>
                <header class="relative flex w-full items-center justify-between">
                    <h2 class="text-xl">Menu</h2>
                    <button on:click={() => (showMenu = false)} class="relative h-full flex justify-center items-center">
                        <CloseIcon />
                    </button>
                </header>
                <menu>
                    <Item on:close={() => (showMenu = false)} href="/app" label="Dashboard" icon={IconHome} />
                    <Item on:close={() => (showMenu = false)} href="/app/memos" label="Mémos" icon={MemoIcon} />
                    <Item on:close={() => (showMenu = false)} href="/app/tasks" label="Tâches" icon={TaskIcon} />
                    <Item on:close={() => (showMenu = false)} href="/app/mark-books" label="Carnets de notes" icon={GradeIcon} />
                    <Item on:close={() => (showMenu = false)} href="/app/settings" label="Paramètres" icon={IconSettings} />
                </menu>
            </Card>
        </FullScreen.Backdrop>
    {/if}
</div>

<nav class="hidden md:flex flex-col justify-between items-center h-full {showMenu ? "w-[200px]" : "w-20"} duration-300 overflow-x-hidden ease-in-out p-5 bg-neutral-100">
    <ul class="relative w-full flex flex-col justify-start gap-3">
        <li class="relative flex w-full h-[60px] items-center justify-center">
            <button on:click={() => (showMenu = !showMenu)} class="relative flex h-full w-full items-center justify-start gap-8 p-2 text-center rounded-md hover:bg-stone-400 text-sm">
                <IconMenu2 class="min-w-6 min-h-6" />
                <span>Menu</span>
            </button>
        </li>
        <DesktopItem href="/app" label="Home" icon={IconHome} on:click={() => (showMenu = false)} />
        <DesktopItem href="/app/memos" label="Mémos" icon={MemoIcon} on:click={() => (showMenu = false)} />
        <DesktopItem href="/app/tasks" label="Tâches" icon={TaskIcon} on:click={() => (showMenu = false)} />
        <DesktopItem href="/app/mark-books" label="Notes" icon={GradeIcon} on:click={() => (showMenu = false)} />
        <DesktopItem href="/app/settings" label="Paramètres" icon={IconSettings} on:click={() => (showMenu = false)} />
    </ul>
    <ul class="relative w-full flex flex-col gap-3">
        <li class="relative flex w-full h-[60px] items-center justify-center">
            <a
                href="/auth/logout"
                class="relative flex flex-col h-full w-full items-center justify-evenly gap-1 p-2 text-center rounded-md bg-red-500 duration-150 ease-linear hover:bg-red-600 text-sm"
            >
                <IconLogout />
            </a>
        </li>
    </ul>
</nav>
