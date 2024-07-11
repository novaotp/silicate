<script lang="ts">
    import MenuIcon from '@tabler/icons-svelte/IconMenu.svelte';
    import CloseIcon from '@tabler/icons-svelte/IconX.svelte';
    import MemoIcon from '@tabler/icons-svelte/IconNote.svelte';
    import GradeIcon from '@tabler/icons-svelte/IconStars.svelte';
    import IconHome from '@tabler/icons-svelte/IconHome.svelte';
    import TaskIcon from '@tabler/icons-svelte/IconChecklist.svelte';
    import IconMenu2 from '@tabler/icons-svelte/IconMenu2.svelte';
    import IconX from '@tabler/icons-svelte/IconX.svelte';
    import IconBell from '@tabler/icons-svelte/IconBell.svelte';
    import Item from './Item.svelte';
    import DesktopItem from './DesktopItem.svelte';
    import { FullScreen, Card } from "$lib/ui";
    import { getContext } from 'svelte';
    import type { TaskNotification } from '$libs/models/Task';
    import type { Writable } from 'svelte/store';
    import Notifications from './Notifications.svelte';
    import Avatar from '../Avatar.svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    export let showMenu: boolean = false;
    let showNotifications: boolean = false;
    let notificationButtonNode: HTMLButtonElement;

    const taskNotifications = getContext<Writable<TaskNotification[]>>('taskNotifications');

    $: unreadTaskNotificationsCount = $taskNotifications.reduce((prev, curr) => curr.isRead ? prev : prev + 1, 0);
</script>

<div class="md:hidden block text-neutral-950">
    <nav class="relative w-full flex justify-between px-5 py-[10px] h-20 dark:text-neutral-100">
        <button on:click={() => (showMenu = true)} class="relative h-full flex justify-center items-center">
            <MenuIcon />
        </button>
        <div class="relative h-full flex justify-center items-center gap-5">
            <button
                class="relative flex flex-col h-full min-w-10 items-center justify-evenly gap-1 p-2 text-center rounded-md
                        bg-red-500 duration-150 ease-linear hover:bg-red-600 text-sm"
                on:click={() => (showNotifications = true)}
                bind:this={notificationButtonNode}
            >
                <IconBell />
                {#if unreadTaskNotificationsCount > 0}
                    <span class="absolute top-0 right-0 size-5 flex justify-center items-center rounded-full bg-accent-danger-500 text-xs text-white">
                        {unreadTaskNotificationsCount}
                    </span>
                {/if}
            </button>
            <Notifications bind:show={showNotifications} bind:notificationButtonNode showMenu={false} />
            <button on:click={() => goto("/app/settings")}>
                <Avatar class="h-10 aspect-square" />
            </button>
        </div>
    </nav>
    {#if showMenu}
        <FullScreen.Backdrop class="flex justify-center items-center" on:click={() => (showMenu = false)}>
            <Card class="mx-auto w-[calc(100%-40px)] flex flex-col gap-4">
                <header class="relative flex w-full items-center justify-between dark:text-neutral-100">
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
                </menu>
            </Card>
        </FullScreen.Backdrop>
    {/if}
</div>

<nav class="hidden md:flex flex-col justify-between items-center h-full {showMenu ? "w-[200px]" : "w-20"} duration-300 overflow-x-hidden ease-in-out py-5 bg-neutral-100 dark:bg-neutral-900">
    <ul class="relative w-full flex flex-col justify-start gap-3">
        <li class="relative flex w-full items-center justify-center">
            <button on:click={() => (showMenu = !showMenu)} class="relative flex h-full w-full items-center justify-start py-[10px] text-center rounded-md hover:bg-stone-400 dark:text-neutral-50 text-sm">
                <span class="relative min-w-20 h-full flex justify-center items-center">
                    {#if !showMenu}
                        <IconMenu2 class="min-w-6 min-h-6" />
                    {:else}
                        <IconX class="min-w-6 min-h-6" />
                    {/if}
                </span>
                <span>Menu</span>
            </button>
        </li>
        <DesktopItem href="/app" label="Home" icon={IconHome} on:click={() => (showMenu = false)} />
        <DesktopItem href="/app/memos" label="Mémos" icon={MemoIcon} on:click={() => (showMenu = false)} />
        <DesktopItem href="/app/tasks" label="Tâches" icon={TaskIcon} on:click={() => (showMenu = false)} />
        <DesktopItem href="/app/mark-books" label="Notes" icon={GradeIcon} on:click={() => (showMenu = false)} />
    </ul>
    <ul class="relative w-full flex flex-col gap-3">
        <li class="relative flex flex-col w-full items-center justify-center">
            <button
                class="relative group flex h-full w-full overflow-hidden min-w-10 items-center justify-start py-[10px] text-center rounded-md
                        bg-red-500 duration-150 ease-linear hover:bg-red-600 text-sm dark:text-neutral-50"
                on:click={() => (showNotifications = !showNotifications)}
                bind:this={notificationButtonNode}
            >
                <span class="relative group-hover:text-primary-600 group-hover:dark:text-primary-400 min-w-20 h-full flex justify-center items-center">
                    <IconBell />
                </span>
                <span class="group-hover:text-primary-600 group-hover:dark:text-primary-400">Notifications</span>
                {#if unreadTaskNotificationsCount > 0}
                    <span class="absolute top-0 right-0 size-5 flex justify-center items-center rounded-full bg-accent-danger-500 text-xs text-white">
                        {unreadTaskNotificationsCount}
                    </span>
                {/if}
            </button>
            <Notifications bind:show={showNotifications} {notificationButtonNode} {showMenu} />
        </li>
        <li class="relative flex w-full max-h-10 items-center justify-center">
            <a
                href="/app/settings"
                on:click={() => (showMenu = false)}
                class="link group relative flex h-full w-full items-center justify-start text-center text-sm overflow-hidden"
                class:current={$page.url.pathname === "/app/settings"}
            >
                <span class="relative min-w-20 max-w-20 h-full min-h-10 flex justify-center items-center">
                    <Avatar class="h-full aspect-square" initialsClass="text-sm" />
                </span>
                <span class="group-hover:text-primary-600 group-hover:dark:text-primary-400 dark:text-neutral-50">Paramètres</span>
            </a>
        </li>
    </ul>
</nav>

<style lang="postcss">
    .current {
        @apply text-primary-600;
    }

    .current::before {
        @apply content-[""] absolute top-0 left-[1px] w-[2px] h-full bg-primary-600;
    }
</style>
