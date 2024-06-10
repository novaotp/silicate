<script lang="ts">
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { IconArchive, IconArchiveOff, IconNotes, IconNotesOff, IconTag, IconTagOff, IconTrash } from '@tabler/icons-svelte';
    import { getContext } from 'svelte';
    import { addToast } from '$lib/stores/toast';
    import { changeSearchParams, fetchCategories, type PageContext } from '../utils';
    import { page } from '$app/stores';
    import type { Task } from '$libs/models/Task';
    import { Attachments, Category, Description, Due, Steps } from './View';
    import { fetchTasks } from '../utils';
    import * as Utils from './TaskDetails';
    import { fly } from 'svelte/transition';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { Button, FullScreen } from '$lib/ui';

    export let showSettings: boolean;

    const { tasks, categories } = getContext<PageContext>('page');

    const jwt = getContext<string>('jwt');

    export let task: Task;

    let replica: Task = { ...task };
    $: ({ id, steps, attachments, archived } = replica);

    $: categorySearchParams = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';
    $: archivedSearchParam = $page.url.searchParams.get('tab') === 'archives';

    let timer: NodeJS.Timeout;
    const controller = new AbortController();
    const signal = controller.signal;

    const edit = async () => {
        if (replica.title.trimEnd() === '') {
            addToast({ type: 'info', message: 'Un titre est requis.' });
            return;
        }

        const { success, message } = await Utils.edit(id, jwt, {
            title: replica.title,
            description: replica.description,
            due: replica.due ?? new Date(0)
        });

        if (!success) {
            addToast({ type: 'error', message });
            return;
        }

        const updatedTasks = await fetchTasks(jwt, categorySearchParams, search, archived);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
    };

    const destroy = async () => {
        const { success, message } = await Utils.destroy(id, jwt);

        if (!success) {
            addToast({ type: 'error', message });
            return;
        } else {
            addToast({ type: 'success', message: 'Tâche supprimée avec succès.' });
        }

        const updatedTasks = await fetchTasks(jwt, categorySearchParams, search, archived);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
        changeSearchParams("id", null)
    };

    const archive = async () => {
        replica.archived = !replica.archived;

        const { success, message }: ApiResponse = await Utils.archive(id, jwt, replica.archived);

        if (!success) {
            addToast({ type: 'error', message });
            return;
        } else {
            const message = replica.archived ? 'Tâche archivée et retirée' : 'Archivage annulée';
            addToast({ type: 'success', message: message });
        }

        const updatedTasks = await fetchTasks(jwt, categorySearchParams, search, archivedSearchParam);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
    };

    let showCategoryChanger: boolean = false;

    const addCategory = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ category: replica.category }),
            headers: {
                accept: 'application/json',
                authorization: jwt,
                'content-type': 'application/json'
            }
        });

        const { success, message }: ApiResponse = await response.json();

        if (!success) {
            addToast({ type: 'error', message });
            return;
        }

        const updatedTasks = await fetchTasks(jwt, categorySearchParams, search, archivedSearchParam);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;

        const updatedCategories = await fetchCategories(jwt, archivedSearchParam);

        if (!updatedCategories) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les catégories.' });
            return;
        }

        $categories = updatedCategories;
    };

    const removeCategory = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ category: null }),
            headers: {
                accept: 'application/json',
                authorization: jwt,
                'content-type': 'application/json'
            }
        });

        const { success, message }: ApiResponse = await response.json();

        if (!success) {
            addToast({ type: 'error', message });
            return;
        }

        const updatedTasks = await fetchTasks(jwt, categorySearchParams, search, archivedSearchParam);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;

        const updatedCategories = await fetchCategories(jwt, archivedSearchParam);

        if (!updatedCategories) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les catégories.' });
            return;
        }

        $categories = updatedCategories;

        addToast({ type: 'success', message: 'Catégorie supprimée.' });
    };
</script>

<div class="relative w-full h-full flex flex-col justify-start items-start">
    <div class="relative px-5 pt-20 pb-5 w-full flex flex-col items-start gap-5 text-primary-950">
        <input
            value={replica.title}
            on:input={async (event) => {
                replica.title = event.currentTarget.value;
                clearTimeout(timer);
                timer = setTimeout(async () => {
                    await edit();
                }, 750);
            }}
            class="relative w-full flex justify-between items-center bg-transparent text-2xl font-medium"
        />
        {#if replica.category}
            <Category {id} bind:show={showCategoryChanger} bind:value={replica.category} on:edit={edit} />
        {/if}
        <Due bind:value={replica.due} on:edit={edit} />
        {#if replica.description !== null}
            <Description bind:value={replica.description} on:edit={edit} />
        {/if}
        <Attachments {id} bind:value={attachments} {signal} />
        <Steps {id} bind:value={steps} />
    </div>
</div>
{#if showSettings}
    <FullScreen.Backdrop on:click={() => (showSettings = false)} class="flex justify-center items-end z-[999]">
        <div role="dialog" class="fixed w-full flex flex-col shadow-2xl bg-white" transition:fly={{ y: 50 }}>
            {#if !replica.category}
                <button
                    on:click={async () => {
                        replica.category = 'Ma catégorie';
                        showCategoryChanger = true;
                        setTimeout(async () => await addCategory(), 400);
                    }}
                    class="relative w-full px-5 h-14 flex justify-start items-center gap-10"
                >
                    <IconTag />
                    <span>Ajouter une catégorie</span>
                </button>
            {:else}
                <button
                    on:click={async () => {
                        setTimeout(async () => await removeCategory(), 400);
                        replica.category = null;
                    }}
                    class="relative w-full px-5 h-14 flex justify-start items-center gap-10"
                >
                    <IconTagOff />
                    <span>Supprimer la catégorie</span>
                </button>
            {/if}
            {#if replica.description === null}
                <button
                    on:click={async () => {
                        replica.description = '';
                        await edit();
                    }}
                    class="relative w-full px-5 h-14 flex justify-start items-center gap-10"
                >
                    <IconNotes />
                    <span>Ajouter une description</span>
                </button>
            {:else}
                <button
                    on:click={async () => {
                        replica.description = null;
                        await edit();
                    }}
                    class="relative w-full px-5 h-14 flex justify-start items-center gap-10"
                >
                    <IconNotesOff />
                    <span>Supprimer la description</span>
                </button>
            {/if}
            <Button.Normal variant="secondary" on:click={archive} class="px-5 h-14 border-0 rounded-none flex justify-start items-center gap-10">
                {#if archived}
                    <IconArchiveOff />
                    <span>Retirer de l'archive</span>
                {:else}
                    <IconArchive />
                    <span>Archiver</span>
                {/if}
            </Button.Normal>
            <Button.Danger variant="secondary" on:click={destroy} class="px-5 h-14 border-0 rounded-none flex justify-start items-center gap-10">
                <IconTrash />
                <span>Supprimer</span>
            </Button.Danger>
        </div>
    </FullScreen.Backdrop>
{/if}
