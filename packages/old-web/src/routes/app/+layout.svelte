<script lang="ts">
    import Navigation from '$lib/components/shared/Navbar/Navigation.svelte';
    import { onMount, setContext } from 'svelte';
    import type { LayoutServerData } from './$types';
    import { writable } from 'svelte/store';
    import { initSocket, socket } from '$lib/socket';
    import type { TaskNotification } from '$libs/models/Task';

    export let data: LayoutServerData;

    setContext('user', writable(data.user));
    setContext('jwt', data.jwt);
    const taskNotifications = setContext('taskNotifications', writable(data.taskNotifications));

    let showMenu: boolean = false;

    onMount(async () => {
        await initSocket(data.jwt!);

        socket?.on('new_notifications', (notifications: TaskNotification[]) => {
            $taskNotifications = [...$taskNotifications, ...notifications]
            $taskNotifications = $taskNotifications.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        });
    });
</script>

<div class="relative h-full w-full flex flex-col md:flex-row dark:bg-neutral-950">
    <Navigation bind:showMenu />
    <div
        class="relative {showMenu ? "md:w-[calc(100%-200px)]" : "md:w-[calc(100%-80px)]"} duration-300
        ease-in-out h-[calc(100%-60px)] md:shadow-[-2px_0_4px_4px_rgba(0,0,0,0.1)] dark:shadow-none
        md:h-full flex flex-col"
    >
        <slot />
    </div>
</div>
