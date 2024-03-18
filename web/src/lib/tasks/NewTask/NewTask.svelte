<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { Task, Status, Priority, Category } from '$libs/models/Task';
    import type { User } from '$libs/models/User';
    import type { ApiResponseWithData } from '$libs/types/ApiResponse';
    import { IconPlus } from '@tabler/icons-svelte';
    import { createEventDispatcher, getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { fade, fly } from 'svelte/transition';
    import Selector from './Selector.svelte';
    import SveltyPicker, { parseDate } from 'svelty-picker';
    import { fr } from 'svelty-picker/i18n';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { addToast } from '$stores/toast';

    export let tasks: Task[];
    export let statuses: Status[];
    export let priorities: Priority[];
    export let categories: Category[];

    const dispatch = createEventDispatcher();

    let showAddTask: boolean = false;

    $: {
        if (showAddTask) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    }

    const user = getContext<Writable<User>>("user");
    
    let title: string;
    let description: string;
    let category: string = "Aucun";
    let priority: string = priorities.at(0)!;
    let status: string = statuses.at(0)!;
    /**
     * Is `string` because of svelte-picker (can be null but `bind:value` error).
     * 
     * Use `parseDate` from said-library to convert to `Date`.
     */
    let due: string | null = null;

    let showDatePicker: boolean = false;

    const addTask = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks`, {
            method: 'POST',
            body: JSON.stringify({
                userId: $user!.id,
                priority,
                status,
                title,
                description,
                category: category !== "Aucun" ? category : null,
                due: due !== null ? parseDate(due, 'dd.mm.yyyy hh:ii', fr, "standard") : null
            }),
            headers: {
                'content-type': 'application/json'
            }
        });

        const { success, message }: ApiResponseWithData<number> = await response.json();

        if (success) {
            const searchParams = $page.url.searchParams;
            await goto(`/app/tasks?${searchParams}`);

            const response = await fetch(
                `${PUBLIC_BACKEND_URL}/tasks?${searchParams}`
            );
            const { data }: ApiResponseWithData<Task[]> = await response.json();

            tasks = data;
        } else {
            addToast({ type: "error", message: message });
        }

        showAddTask = false;
    };
</script>

<button
    class="fixed bottom-5 right-5 size-[50px] shadow-lg rounded-lg flex justify-center items-center bg-blue-500"
    on:click={() => {
        showAddTask = true;
        dispatch('click');
    }}
>
    <IconPlus class="text-white" />
</button>
{#if showAddTask}
    <div
        role="dialog"
        class="fixed w-full h-full top-0 left-0 bg-white"
        transition:fly={{ y: 100 }}
    >
        <header class="flex justify-between items-center w-full h-[60px] px-5">
            <button class="px-4 py-2 rounded-full text-sm" on:click={() => (showAddTask = false)}>Annuler</button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm" on:click={addTask}>Enregistrer</button>
        </header>
        <div class="relative w-full h-[calc(100%-60px)] p-5 pt-2 flex flex-col justify-start items-start gap-3">
            <!-- svelte-ignore a11y-autofocus -->
            <input bind:value={title} class="relative w-full h-[50px] text-sm bg-gray-200 { title !== "" ? "text-black" : "text-gray-500" } px-5 rounded-lg" placeholder="Entrez le nom de la tâche..." required autofocus />
            <Selector label="Priorité" bind:value={priority} values={priorities} />
            <Selector label="Statut" bind:value={status} values={statuses} />
            <Selector label="Catégorie" bind:value={category} values={["Aucun", ...categories]} acceptOther />
            <div class="relative w-full h-10 flex justify-between items-center [&>span]:absolute [&>span]:mx-auto">
                <p>Échéance</p>
                <button on:click={() => (showDatePicker = true)} class="text-sm relative px-3 py-2 bg-gray-200 rounded-lg">
                    {due !== null ? parseDate(due, 'dd.mm.yyyy hh:ii', fr, "standard").toLocaleString("fr-CH") : "Aucune échéance"}
                </button>
            </div>
            {#if showDatePicker}
                <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.1)] z-[60]" transition:fade>
                    <div transition:fly={{ y: 50 }}>
                        <SveltyPicker pickerOnly format="dd.mm.yyyy hh:ii" mode="datetime" bind:value={due} on:cancel={() => (showDatePicker = false)} on:change={() => (showDatePicker = false)} />
                    </div>
                </div>
            {/if}
            <textarea bind:value={description} class="relative w-full h-[200px] text-sm bg-gray-200 { title !== "" ? "text-black" : "text-gray-500" } p-5 rounded-lg" placeholder="Une description explicative..."></textarea>
        </div>
    </div>
{/if}
