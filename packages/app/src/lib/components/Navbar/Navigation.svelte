<script lang="ts">
    import {
        IconMenu as MenuIcon,
        IconX as CloseIcon,
        IconLayersSubtract as MemoIcon,
        IconStars as GradeIcon,
        IconHome,
        IconLogout,
        IconChecklist as TaskIcon,
        IconSettings
    } from '@tabler/icons-svelte';
    import Item from './Item.svelte';
    import DesktopItem from './DesktopItem.svelte';
    import { FullScreen, Card } from "$lib/ui/index";

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

<nav class="hidden md:flex flex-col justify-between items-center h-full w-[100px] p-5 bg-stone-300">
    <ul class="relative w-full flex flex-col gap-3">
        <DesktopItem href="/app" label="Home" icon={IconHome} />
        <DesktopItem href="/app/memos" label="Mémos" icon={MemoIcon} />
        <DesktopItem href="/app/tasks" label="Tâches" icon={TaskIcon} />
        <DesktopItem href="/app/mark-books" label="Notes" icon={GradeIcon} />
        <DesktopItem href="/app/settings" label="Paramètres" icon={IconSettings} />
    </ul>
    <ul class="relative w-full flex flex-col gap-3">
        <li class="relative flex w-full aspect-square items-center justify-center">
            <a
                href="/auth/logout"
                class="relative flex flex-col h-full w-full items-center justify-evenly gap-1 p-2 text-center rounded-md bg-red-500 duration-150 ease-linear hover:bg-red-600 text-xs"
            >
                <IconLogout class="text-white" />
            </a>
        </li>
    </ul>
</nav>
