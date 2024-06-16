<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { Reminder, Task } from '$libs/models/Task';
    import type { ApiResponseWithData } from '$libs/types/ApiResponse';
    import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
    import IconDotsVertical from '@tabler/icons-svelte/IconDotsVertical.svelte';
    import { getContext } from 'svelte';
    import { fly } from 'svelte/transition';
    import TaskDetails from './TaskDetails.svelte';
    import { page } from '$app/stores';
    import { changeSearchParams, type PageContext } from '../utils';
    import { goto } from '$app/navigation';

    let showSettings: boolean = false;
    const jwt = getContext<string>('jwt');
    const { categories } = getContext<PageContext>('page');
    $: viewedTaskId = $page.url.searchParams.get("id");

    $: categorySearchParam = $page.url.searchParams.has('category') ? decodeURI($page.url.searchParams.get('category')!) : null;

    /**
     * Fetches a task with the given id.
     * @param id The id of the task
     * @param jwt The `Authorization` header
     * @returns The data if it succeeded, `undefined` otherwise.
     */
    export const fetchItems = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/tasks/${viewedTaskId}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: jwt
            }
        });
        const result: ApiResponseWithData<Task> = await response.json();

        if (!result.success) {
            return undefined;
        }

        const response2 = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/tasks/${viewedTaskId}/reminders`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: jwt
            }
        });
        const result2: ApiResponseWithData<Reminder[]> = await response2.json();

        if (!result2.success) {
            return undefined;
        }

        return { task: result.data, reminders: result2.data }
    };

    const closeModal = () => {
        changeSearchParams('id', null)
    }
</script>

{#if viewedTaskId}
    <div role="dialog" class="fixed w-full h-full top-0 left-0 bg-white z-[100] overflow-auto" transition:fly={{ x: -100 }}>
        {#await fetchItems()}
            <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100] bg-white">
                <button class="rounded-full" on:click={closeModal}>
                    <IconChevronLeft />
                </button>
            </header>
            <div class="relative w-full h-full flex justify-center items-center px-5">
                <p>Chargement de la tâche...</p>
            </div>
        {:then item}
            {#if item}
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
                <TaskDetails task={item.task} reminders={item.reminders} bind:showSettings on:close />
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
