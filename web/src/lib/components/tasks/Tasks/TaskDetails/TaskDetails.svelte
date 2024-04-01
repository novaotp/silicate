<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { IconCheck, IconChevronLeft, IconEdit, IconTrashX } from '@tabler/icons-svelte';
    import { getContext } from 'svelte';
    import { addToast } from '$lib/stores/toast';
    import { type PageContext } from '../../types';
    import StepComponent from './Step.svelte';
    import { fly } from 'svelte/transition';
    import View from './View.svelte';
    import { invalidateAll } from '$app/navigation';
    import { browser } from '$app/environment';
    import Edit from './Edit.svelte';
    import { fetchTasks } from './utils';
    import { page } from '$app/stores';

    const { tasks } = getContext<PageContext>('page');
    /** The id of the task to show. */
    export let id: number | null;

    $: task = $tasks.find((t) => t.id === id);

    let isInEditingMode: boolean = false;
    $: EditIcon = isInEditingMode ? IconCheck : IconEdit;

    const edit = async () => {
        if (!task || !browser) return;

        if (isInEditingMode) {
            if (task.title.trimEnd() === "") {
                addToast({ type: "info", message: "Un titre est requis." });
                return;
            }

            const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${task.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    category: task.category,
                    due: task.due,
                    steps: task.steps
                }),
                headers: {
                    "accept": "application/json",
                    "authorization": getContext<string>('jwt'),
                    "content-type": "application/json"
                }
            });
            const { success, message }: ApiResponse = await response.json();

            if (!success) {
                addToast({ type: 'error', message });
                return;
            } else {
                addToast({ type: 'success', message: "Tâche modifiée avec succès." });
            }

            const updatedTasks = await fetchTasks($page.url.searchParams.get("category") ?? "", $page.url.searchParams.get("search") ?? "")

            if (!updatedTasks) {
                addToast({ type: 'error', message: "Impossible de mettre à jour les tâches." });
                return;
            }

            $tasks = updatedTasks;
        }

        isInEditingMode = !isInEditingMode;
    };

    const destroy = async () => {
        if (!task || !browser) return;

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${task.id}`, {
            method: 'DELETE',
            headers: {
                "authorization": getContext<string>('jwt')
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
                <button class="rounded-full bg-blue-500 text-white px-4 py-2" on:click={edit}>
                    <svelte:component this={EditIcon} />
                </button>
            </div>
        </header>
        <div class="relative w-full h-full flex flex-col justify-start items-start">
            {#if isInEditingMode}
                <Edit {task} />
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
