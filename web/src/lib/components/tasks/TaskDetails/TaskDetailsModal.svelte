<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { Task } from '$libs/models/Task';
    import type { ApiResponseWithData } from '$libs/types/ApiResponse';
    import { IconChevronLeft, IconDotsVertical } from '@tabler/icons-svelte';
    import { getContext } from 'svelte';
    import { fly } from 'svelte/transition';
    import TaskDetails from './TaskDetails.svelte';
    import { page } from '$app/stores';
    import { changeSearchParams, type PageContext } from '../utils';
    import { goto } from '$app/navigation';

    let showSettings: boolean = false;
    const jwt = getContext<string>('jwt');
    const { categories, viewedTaskId } = getContext<PageContext>('page');

    $: categorySearchParam = $page.url.searchParams.has('category') ? decodeURI($page.url.searchParams.get('category')!) : null;

    /**
     * Fetches a task with the given id.
     * @param id The id of the task
     * @param jwt The `Authorization` header
     * @returns The data if it succeeded, `undefined` otherwise.
     */
    export const fetchTask = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${$viewedTaskId}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: jwt
            }
        });
        const result: ApiResponseWithData<Task> = await response.json();

        return result.success ? result.data : undefined;
    };

    const closeModal = () => {
        $viewedTaskId = null;
    }
</script>

{#key viewedTaskId}
{#if $viewedTaskId}
    <div role="dialog" class="fixed w-full h-full top-0 left-0 bg-white z-[100] overflow-auto" transition:fly={{ x: -100 }}>
        {#await fetchTask()}
            <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100] bg-white">
                <button class="rounded-full" on:click={closeModal}>
                    <IconChevronLeft />
                </button>
            </header>
            <div class="relative w-full h-full flex justify-center items-center px-5">
                <p>Chargement de la tâche...</p>
            </div>
        {:then task}
            {#if task}
                <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[110] glass">
                    <button
                        class="rounded-full"
                        on:click={() => {
                            closeModal();

                            if (categorySearchParam !== null && !$categories.includes(categorySearchParam)) {
                                const searchParams = new URLSearchParams($page.url.searchParams);
                                searchParams.delete('category');
                                setTimeout(() => goto(`/app/tasks?${searchParams}`, { invalidateAll: true }), 400);
                            }
                        }}
                    >
                        <IconChevronLeft />
                    </button>
                    <button class="py-2" on:click={() => (showSettings = !showSettings)}>
                        <IconDotsVertical />
                    </button>
                </header>
                <TaskDetails {task} bind:showSettings on:close />
            {:else}
                <p>Une erreur est survenue.</p>
            {/if}
        {/await}
    </div>
{/if}
{/key}

<style lang="scss">
    $blur: 10px;

    .glass {
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur($blur);
        -webkit-backdrop-filter: blur($blur);
    }
</style>
