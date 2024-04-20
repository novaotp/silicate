<script lang="ts">
    import { IconChevronLeft, IconDotsVertical } from '@tabler/icons-svelte';
    import { getContext } from 'svelte';
    import { fly } from 'svelte/transition';
    import TaskDetails from './TaskDetails.svelte';
    import { type PageContext } from '../utils';
    import { getTask } from '$/lib/requests/tasks';
    import { push, querystring } from 'svelte-spa-router';

    let showSettings: boolean = false;
    const { categories, viewedTaskId } = getContext<PageContext>('page');

    $: urlSearchParams = new URLSearchParams($querystring);
    $: categorySearchParam = urlSearchParams.has('category') ? decodeURI(urlSearchParams.get('category')!) : null;

    const closeModal = () => {
        $viewedTaskId = null;
    };
</script>

{#if $viewedTaskId}
    <div role="dialog" class="fixed w-full h-full top-0 left-0 bg-white z-[100] overflow-auto" transition:fly={{ x: -100 }}>
        {#await getTask($viewedTaskId)}
            <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100] bg-white">
                <button class="rounded-full" on:click={closeModal}>
                    <IconChevronLeft />
                </button>
            </header>
            <div class="relative w-full h-full flex justify-center items-center px-5">
                <p>Chargement de la tâche...</p>
            </div>
        {:then task}
            {#if task.success}
                <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[110] glass">
                    <button
                        class="rounded-full"
                        on:click={() => {
                            closeModal();

                            if (categorySearchParam !== null && !$categories.includes(categorySearchParam)) {
                                urlSearchParams.delete('category');
                                setTimeout(() => push(`/app/tasks?${urlSearchParams}`), 400);
                            }
                        }}
                    >
                        <IconChevronLeft />
                    </button>
                    <button class="py-2" on:click={() => (showSettings = !showSettings)}>
                        <IconDotsVertical />
                    </button>
                </header>
                <TaskDetails task={task.data} bind:showSettings on:close />
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
