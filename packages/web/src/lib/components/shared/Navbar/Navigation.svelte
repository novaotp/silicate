<script lang="ts">
    import MenuIcon from '@tabler/icons-svelte/icons/menu';
    import CloseIcon from '@tabler/icons-svelte/icons/x';
    import IconMenu2 from '@tabler/icons-svelte/icons/menu-2';
    import IconX from '@tabler/icons-svelte/icons/x';
    import IconBell from '@tabler/icons-svelte/icons/bell';
    import IconTool from '@tabler/icons-svelte/icons/tool';
    import { FullScreen, Card } from '$lib/ui';
    import { getContext } from 'svelte';
    import type { TaskNotification } from '$libs/models/Task';
    import type { Writable } from 'svelte/store';
    import Notifications from './Notifications.svelte';
    import Avatar from '../Avatar.svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { navigationItems } from './navigation-items';
    import { ToolsMenu } from './tools-menu';

    export let showMenu: boolean;

    let showNotifications: boolean = false;
    let showToolMenu: boolean = false;
    let toolsButtonNode: HTMLButtonElement;
    let notificationButtonNode: HTMLButtonElement;

    const taskNotifications = getContext<Writable<TaskNotification[]>>('taskNotifications');

    $: unreadTaskNotificationsCount = $taskNotifications.reduce((prev, curr) => (curr.isRead ? prev : prev + 1), 0);
</script>

<div class="md:hidden block text-neutral-950">
    <nav class="relative w-full flex justify-between p-5 h-20 dark:text-neutral-100">
        <button on:click={() => (showMenu = true)} class="relative h-full flex justify-center items-center">
            <MenuIcon />
        </button>
        <div class="relative h-full flex justify-center items-center gap-5">
            <button
                on:click={() => (showToolMenu = !showToolMenu)}
                class="relative flex h-full w-full overflow-hidden justify-center items-center text-center rounded-md
                        bg-red-500 duration-150 ease-linear hover:bg-red-600 text-sm dark:text-neutral-50"
            >
                <IconTool />
            </button>
            <ToolsMenu bind:show={showToolMenu} />
            <button
                class="relative flex flex-col h-full items-center justify-evenly gap-1 text-center rounded-md
                        bg-red-500 duration-150 ease-linear hover:bg-red-600 text-sm"
                on:click={() => (showNotifications = true)}
                bind:this={notificationButtonNode}
            >
                <IconBell />
                {#if unreadTaskNotificationsCount > 0}
                    <span
                        class="absolute top-0 right-0 size-5 flex justify-center items-center rounded-full bg-accent-danger-500 text-xs text-white"
                    >
                        {unreadTaskNotificationsCount}
                    </span>
                {/if}
            </button>
            <Notifications bind:show={showNotifications} bind:notificationButtonNode showMenu={false} />
            <button on:click={() => goto('/app/settings')}>
                <Avatar class="h-10 aspect-square" />
            </button>
        </div>
    </nav>
    {#if showMenu}
        <FullScreen.Backdrop class="flex justify-center items-center" on:click={() => (showMenu = false)}>
            <Card class="mx-auto w-[calc(100%-40px)] flex flex-col gap-4">
                <header class="relative flex w-full items-center justify-between dark:text-neutral-100">
                    <h2 class="text-xl">Menu</h2>
                    <button
                        on:click={() => (showMenu = false)}
                        class="relative h-full flex justify-center items-center"
                    >
                        <CloseIcon />
                    </button>
                </header>
                <menu>
                    {#each navigationItems as { href, label, icon }}
                        <li
                            class="relative flex w-full items-center justify-center h-[50px]
                                    border-x border-t border-gray-400 first-of-type:rounded-t-md
                                    last-of-type:rounded-b-md last-of-type:border-b dark:border-neutral-500"
                        >
                            <button
                                on:click={() => {
                                    showMenu = false;
                                    goto(href)
                                }}
                                class="relative flex h-full w-full items-center justify-start px-5 gap-5 dark:text-neutral-100"
                            >
                                <svelte:component this={icon} class="stroke-[1.5]" />
                                <span>{label}</span>
                            </button>
                        </li>
                    {/each}
                </menu>
            </Card>
        </FullScreen.Backdrop>
    {/if}
</div>

<nav
    class="hidden md:flex flex-col justify-between items-center h-full {showMenu ? 'w-[200px]' : 'w-20'}
    duration-300 overflow-x-hidden ease-in-out py-5 bg-neutral-100 dark:bg-neutral-900"
>
    <ul class="relative w-full flex flex-col justify-start gap-3">
        <li class="relative flex w-full items-center justify-center">
            <button
                on:click={() => (showMenu = !showMenu)}
                class="relative flex h-full w-full items-center justify-start py-[10px]
                text-center rounded-md hover:bg-stone-400 dark:text-neutral-50 text-sm"
            >
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
        {#each navigationItems as { href, label, icon }}
            <li class="relative flex w-full items-center justify-center">
                <a
                    {href}
                    on:click={() => (showMenu = false)}
                    class="link group relative flex h-full w-full items-center justify-start py-[10px]
                            text-center text-sm overflow-hidden dark:text-neutral-50"
                    class:current={$page.url.pathname === href}
                >
                    <span class="relative min-w-20 h-full flex justify-center items-center">
                        <svelte:component
                            this={icon}
                            class="group-hover:text-primary-600 group-hover:dark:text-primary-400 min-w-6 min-h-6"
                        />
                    </span>
                    <span class="group-hover:text-primary-600 group-hover:dark:text-primary-400">{label}</span>
                </a>
            </li>
        {/each}
    </ul>
    <ul class="relative w-full flex flex-col gap-3">
        <li class="relative flex flex-col w-full items-center justify-center">
            <button
                bind:this={toolsButtonNode}
                on:click={() => (showToolMenu = !showToolMenu)}
                class="relative group flex h-full w-full overflow-hidden min-w-10 items-center justify-start py-[10px] text-center rounded-md
                        bg-red-500 duration-150 ease-linear hover:bg-red-600 text-sm dark:text-neutral-50"
            >
                <span
                    class="relative group-hover:text-primary-600 group-hover:dark:text-primary-400 min-w-20 h-full flex justify-center items-center"
                >
                    <IconTool />
                </span>
                <span class="group-hover:text-primary-600 group-hover:dark:text-primary-400">Outils pédagogiques</span>
            </button>
            <ToolsMenu bind:show={showToolMenu} />
        </li>
        <li class="relative flex flex-col w-full items-center justify-center">
            <button
                on:click={() => (showNotifications = !showNotifications)}
                bind:this={notificationButtonNode}
                class="relative group flex h-full w-full overflow-hidden min-w-10 items-center justify-start py-[10px] text-center rounded-md
                        bg-red-500 duration-150 ease-linear hover:bg-red-600 text-sm dark:text-neutral-50"
            >
                <span
                    class="relative group-hover:text-primary-600 group-hover:dark:text-primary-400 min-w-20 h-full flex justify-center items-center"
                >
                    <IconBell />
                </span>
                <span class="group-hover:text-primary-600 group-hover:dark:text-primary-400">Notifications</span>
                {#if unreadTaskNotificationsCount > 0}
                    <span
                        class="absolute top-0 right-0 size-5 flex justify-center items-center rounded-full bg-accent-danger-500 text-xs text-white"
                    >
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
                class:current={$page.url.pathname === '/app/settings'}
            >
                <span class="relative min-w-20 max-w-20 h-full min-h-10 flex justify-center items-center">
                    <Avatar class="h-full aspect-square" initialsClass="text-sm" />
                </span>
                <span class="group-hover:text-primary-600 group-hover:dark:text-primary-400 dark:text-neutral-50"
                    >Paramètres</span
                >
            </a>
        </li>
    </ul>
</nav>

<style lang="postcss">
    .current {
        @apply text-primary-600 dark:text-primary-400;
    }

    .current::before {
        @apply content-[""] absolute top-0 left-[1px] w-[2px] h-full bg-primary-600 dark:bg-primary-400;
    }
</style>
