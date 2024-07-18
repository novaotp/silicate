<script lang="ts">
    import { clickOutside } from '$lib/utils/click-outside';
    import { Separator } from '$lib/ui';
    import type { TaskNotification } from '$libs/models/Task';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { addToast } from '$lib/stores/toast';
    import { fly } from 'svelte/transition';
    import { timeDiff } from './Notifications';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import IconChecks from '@tabler/icons-svelte/icons/checks';
    import IconBellOff from '@tabler/icons-svelte/icons/bell-off';

    export let notificationButtonNode: HTMLButtonElement;
    export let show: boolean;
    export let showMenu: boolean;

    let clientWidth: number;
    const jwt = getContext<string>("jwt");
    const taskNotifications = getContext<Writable<TaskNotification[]>>('taskNotifications');

    const markAllNotificationsAsRead = async () => {
        const unReadTaskNotificationIds = $taskNotifications.filter(notification => !notification.isRead).map(notification => notification.id);
        // Optimistic update
        $taskNotifications = $taskNotifications.map(notification => { return { ...notification, isRead: true } });

        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/tasks/notifications`, {
            method: "PUT",
            body: JSON.stringify({ notificationIds: unReadTaskNotificationIds }),
            headers: {
                "accept": "application/json",
                "authorization": `Bearer ${jwt}`,
                "content-type": "application/json"
            }
        });

        const result: ApiResponse = await response.json();

        if (!result.success) {
            // Optimistic update failover
            $taskNotifications = $taskNotifications.map(notification => {
                if (unReadTaskNotificationIds.includes(notification.id)) {
                    return { ...notification, isRead: false };
                }

                return notification;
            });
            return addToast({ type: "error", message: result.message });
        }
    }
</script>

<svelte:window bind:innerWidth={clientWidth}></svelte:window>

{#if show}
    <article
        class="fixed top-20 md:top-auto md:bottom-[10px] left-5 {showMenu ? "md:left-[210px]" : "md:left-[90px]"} w-[calc(100%-40px)] md:max-w-[400px] max-h-[600px] flex flex-col z-[200] rounded-lg bg-white dark:bg-neutral-900 shadow-[0_0_8px_8px_rgba(0,0,0,0.1)]"
        use:clickOutside={{ avoid: [notificationButtonNode] }}
        on:emit={() => (show = false)}
        transition:fly={{ y: clientWidth < 768 ? -50 : 50 }}
    >
        <div class="relative w-full p-5 flex justify-between items-baseline">
            <h2 class="dark:text-neutral-50">Notifications</h2>
            <button
                class="text-primary-700 dark:text-primary-400"
                on:click={() => addToast({ type: "info", message: "Fonctionnalité pas encore implémentée" })}
            >
                VOIR TOUT
            </button>
        </div>
        <Separator />
        <ul class="relative w-full flex flex-col overflow-auto divide-y divide-neutral-100 dark:divide-neutral-500">
            {#each $taskNotifications as { id, message, isRead, createdAt }}
                <li class="relative w-full p-5" class:unread={!isRead} class:read={isRead}>
                    <h3 class="text-sm dark:text-neutral-100">{message}</h3>
                    <time class="text-xs text-neutral-500 dark:text-neutral-300">{timeDiff(createdAt)}</time>
                </li>
            {:else}
                <li class="relative w-full p-5 flex flex-col justify-center items-center gap-[10px] text-neutral-500 dark:text-neutral-300">
                    <IconBellOff class="size-10" />
                    <span class="text-sm text-center">
                        Il n'y pas grand-chose ici pour l'instant... Reviens lorsque tu reçois ta première notification !
                    </span>
                </li>
            {/each}
        </ul>
        <Separator />
        <div class="relative w-full p-5 flex justify-end items-center">
            <button
                class="flex gap-[10px]"
                on:click={markAllNotificationsAsRead}
            >
                <IconChecks class="text-primary-700 size-5 dark:text-primary-400" />
                <span class="text-sm dark:text-neutral-50">Marquer tout comme lu</span>
            </button>
        </div>
    </article>
{/if}

<style lang="postcss">
    .read {
        @apply bg-neutral-50 dark:bg-neutral-900;
    }

    .unread * {
        @apply font-medium;
    }

    .unread::before {
        @apply absolute content-[""] top-0 left-0 w-[2px] h-full bg-primary-500;
    }
</style>
