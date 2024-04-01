<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { IconCheck, IconChevronLeft, IconEdit, IconTrashX } from '@tabler/icons-svelte';
    import { createEventDispatcher, getContext } from 'svelte';
    import { addToast } from '$lib/stores/toast';
    import type { PageContext } from '../../types';
    import StepComponent from './Step.svelte';
    import { fly } from 'svelte/transition';
    import View from './View.svelte';
    import { invalidateAll } from '$app/navigation';
    import { browser } from '$app/environment';

    const { tasks } = getContext<PageContext>('page');
    /** The id of the task to show. */
    export let id: number | null;

    $: task = $tasks.find((t) => t.id === id);

    const dispatch = createEventDispatcher();

    let isInEditingMode: boolean = false;
    $: EditIcon = isInEditingMode ? IconCheck : IconEdit;

    const edit = () => dispatch('edit');
    const destroy = async () => {
        if (!task || !browser) return;

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${task.id}`, {
            method: 'DELETE',
            headers: {
                "authorization": getContext<string>("jwt")
            }
        });
        const { success, message }: ApiResponse = await response.json();

        if (!success) {
            addToast({ type: 'error', message });
            return;
        }

        await invalidateAll();
        id = null;
    };
</script>

{#if id !== null && task}
    <div role="dialog" class="fixed w-full h-full top-0 left-0 bg-white z-[100]" transition:fly={{ x: -100 }}>
        <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100]">
            <button class="rounded-full" on:click={() => (id = null)}>
                <IconChevronLeft class="text-white" />
            </button>
            <div class="flex justify-between items-center gap-4">
                <button class="rounded-full text-red-500 py-2" on:click={destroy}>
                    <IconTrashX />
                </button>
                <button class="rounded-full bg-blue-500 text-white px-4 py-2" on:click={() => (isInEditingMode = !isInEditingMode)}>
                    <svelte:component this={EditIcon} />
                </button>
            </div>
        </header>
        <div class="relative w-full h-full flex flex-col justify-start items-start">
            {#if isInEditingMode}
                <p>Edit</p>
            {:else}
                <View {task} />
            {/if}
            {#if task.steps}
                <div class="relative w-full flex flex-col">
                    {#each JSON.parse(task.steps) as step}
                        <StepComponent bind:step />
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}
