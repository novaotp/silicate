<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { Task } from '$libs/models/Task';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { IconEdit, IconTrashX, IconX } from '@tabler/icons-svelte';
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import { addToast } from '$stores/toast';
    import { formatDate } from '$utils/formatDate';

    /** The id of the task to show. */
    export let id: number | null;
    /** The state of the modal. */
    export let show: boolean;

    $: task = tasks.find(t => t.id === id);

    export let tasks: Task[];

    $: {
        if (show) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    }

    const dispatch = createEventDispatcher();

    const edit = () => dispatch("edit");
    const destroy = async () => {
        if (!task) return;

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${task.id}`, { method: 'DELETE' });
        const { success, message }: ApiResponse = await response.json();

        if (!success) {
            addToast({ type: "error", message });
            return;
        }

        tasks = tasks.filter(t => t.id !== task?.id);
        show = false;
    }
</script>

{#if show && task}
    <div
        role="dialog"
        class="fixed w-full h-full top-0 left-0 bg-white"
        transition:fly={{ y: 100 }}
    >
        <header class="flex justify-between items-center w-full h-[60px] px-5">
            <button class="rounded-full" on:click={() => (show = false)}><IconX /></button>
            <div class="flex gap-2">
                <button class="text-red-500 p-2 rounded-full" on:click={destroy}>
                    <IconTrashX />
                </button>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-full" on:click={edit}>
                    <IconEdit />
                </button>
            </div>
        </header>
        <div class="relative w-full h-[calc(100%-60px)] p-5 pt-2 flex flex-col justify-start items-start gap-3">
            <!-- svelte-ignore a11y-autofocus -->
            <h2 class="relative w-full h-[50px] flex justify-between items-center text-xl text-black font-semibold">
                {task.title}
            </h2>
            <div class="relative w-full flex justify-between items-center">
                <span>Priorité</span>
                <span class="relative px-3 py-2">{task.priority ?? "Aucune"}</span>
            </div>
            <div class="relative w-full flex justify-between items-center">
                <span>Statut</span>
                <span class="relative px-3 py-2">{task.status ?? "Aucun"}</span>
            </div>
            <div class="relative w-full flex justify-between items-center">
                <span>Catégorie</span>
                <span class="relative px-3 py-2">{task.category ?? "Aucune"}</span>
            </div>
            <div class="relative w-full h-10 flex justify-between items-center">
                <span>Échéance</span>
                <span class="relative px-3 py-2">
                    {task.due ? formatDate(task.due) : "Aucune échéance"}
                </span>
            </div>
            {#if task.description}
                <div class="relative w-full h-[200px] text-sm bg-gray-200 text-black p-5 rounded-lg">
                    {task.description}
                </div>
            {/if}
        </div>
    </div>
{/if}
