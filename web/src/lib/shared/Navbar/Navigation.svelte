<script lang="ts">
    import {
        IconMenu as MenuIcon,
        IconX as CloseIcon,
        IconLayersSubtract as MemoIcon,
        IconStars as GradeIcon,
        IconHome,
        IconLogout,
        IconChecklist as TaskIcon
    } from '@tabler/icons-svelte';
    import Item from './Item.svelte';
    import { fade, fly } from 'svelte/transition';
    import DesktopItem from './DesktopItem.svelte';

    let showMenu: boolean = false;
</script>

<div class="md:hidden block">
    <nav class="relative w-full h-[60px] flex justify-start px-5 py-[10px]">
        <button on:click={() => (showMenu = true)} class="relative h-full aspect-square flex justify-center items-center">
            <MenuIcon />
        </button>
    </nav>
    {#if showMenu}
        <div class="md:hidden fixed flex h-full w-full top-0 left-0 justify-center items-center z-[100] bg-[rgba(0,0,0,0.1)]" transition:fade>
            <div role="dialog" class="fixed z-50 m-auto w-[90%] rounded-md p-5 shadow-2xl bg-white" transition:fly={{ y: 50 }}>
                <header class="relative mb-5 flex h-10 w-full items-center justify-between">
                    <h2 class="text-2xl">Menu</h2>
                    <button on:click={() => (showMenu = false)} class="relative aspect-square h-full flex justify-center items-center">
                        <CloseIcon />
                    </button>
                </header>
                <menu>
                    <Item on:close={() => (showMenu = false)} href="/app/memos" label="Mémos" icon={MemoIcon} />
                    <Item on:close={() => (showMenu = false)} href="/app/tasks" label="Tâches" icon={TaskIcon} />
                    <Item on:close={() => (showMenu = false)} href="/app/gradebooks" label="Carnets de notes" icon={GradeIcon} />
                </menu>
            </div>
        </div>
    {/if}
</div>

<nav class="hidden md:flex flex-col justify-between items-center h-full w-[100px] p-5 bg-stone-300">
    <ul class="relative w-full flex flex-col gap-3">
        <DesktopItem href="/app" label="Home" icon={IconHome} />
        <DesktopItem href="/app/memos" label="Mémos" icon={MemoIcon} />
        <DesktopItem href="/app/tasks" label="Tâches" icon={TaskIcon} />
        <DesktopItem href="/app/gradebooks" label="Notes" icon={GradeIcon} />
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
