<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { Task } from '$libs/models/Task';
    import type { ApiResponseWithData } from '$libs/types/ApiResponse';
    import { IconChevronLeft, IconDotsVertical } from '@tabler/icons-svelte';
    import { createEventDispatcher, getContext } from 'svelte';
    import { fly } from 'svelte/transition';
    import TaskDetails from './TaskDetails.svelte';

    export let viewedTaskId: number | null;

    let showSettings: boolean = false;
    const dispatch = createEventDispatcher<{ close: null }>();
    const jwt = getContext<string>('jwt');

    /**
     * Fetches a task with the given id.
     * @param id The id of the task
     * @param jwt The `Authorization` header
     * @returns The data if it succeeded, `undefined` otherwise.
     */
    export const fetchTask = async (id: number) => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: jwt
            }
        });
        const result: ApiResponseWithData<Task> = await response.json();

        return result.success ? result.data : undefined;
    };
</script>

{#if viewedTaskId}
    <div role="dialog" class="fixed w-full h-full top-0 left-0 bg-white z-[100] overflow-auto" transition:fly={{ x: -100 }}>
        {#await fetchTask(viewedTaskId)}
            <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100] bg-white">
                <button class="rounded-full" on:click={() => dispatch('close')}>
                    <IconChevronLeft />
                </button>
            </header>
            <div class="relative w-full h-full flex justify-center items-center px-5">
                <p>Chargement de la tâche...</p>
            </div>
        {:then task}
            {#if task}
                <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100] glass">
                    <button class="rounded-full" on:click={() => dispatch('close')}>
                        <IconChevronLeft />
                    </button>
                    <button class="py-2" on:click={() => (showSettings = !showSettings)}>
                        <IconDotsVertical />
                    </button>
                </header>
                <TaskDetails {task} on:close />
            {:else}
                <p>Une erreur est survenue.</p>
            {/if}
        {/await}
    </div>
{/if}

<style lang="scss">
    $blur: 10px;

    .glass {
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur($blur);
        -webkit-backdrop-filter: blur($blur);
    }
</style>
