<script lang="ts">
    import { page } from '$app/stores';
    import { getContext } from 'svelte';
    import { changeSearchParams, fetchTasks, type PageContext } from '../utils';
    import { goto } from '$app/navigation';
    import TaskDetails from './TaskDetails.svelte';
    import type { Reminder, Task } from '$libs/models/Task';
    import type { SubmitFunction } from '../../../../routes/app/tasks/$types';
    import { addToast } from '$lib/stores/toast';
    import { Button } from '$lib/ui';
    import { deserialize, enhance } from '$app/forms';
    import CategoryChanger from './CategoryChanger.svelte';
    import * as Utils from './TaskDetails';
    import IconX from '@tabler/icons-svelte/icons/x';
    import IconArchive from '@tabler/icons-svelte/icons/archive';
    import IconArchiveOff from '@tabler/icons-svelte/icons/archive-off';
    import IconNotes from '@tabler/icons-svelte/icons/notes';
    import IconNotesOff from '@tabler/icons-svelte/icons/notes-off';
    import IconTrash from '@tabler/icons-svelte/icons/trash';

    export let item: { task: Task; reminders: Reminder[] };
    let replica: Task = { ...item.task };

    const { tasks, categories } = getContext<PageContext>('page');
    const jwt = getContext<string>('jwt');

    let showSettings = false;

    $: categorySearchParam = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';

    const edit = async () => {
        if (replica.title.trimEnd() === '') {
            addToast({ type: 'info', message: 'Un titre est requis.' });
            return;
        }

        const { success, message } = await Utils.edit(replica.id, jwt, {
            title: replica.title,
            description: replica.description,
            due: replica.due ?? new Date(0)
        });

        if (!success) {
            addToast({ type: 'error', message });
            return;
        }

        const updatedTasks = await fetchTasks(jwt, categorySearchParam, search, replica.archived);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
    };

    const archive = async () => {
        // Optimistic update
        replica.archived = !replica.archived;
        item.task = { ...replica, archived: replica.archived };
        const oldTasks = $tasks;
        $tasks = $tasks.map(t => t.id === replica.id ? { ...replica, archived: replica.archived } : t);

        const formData = new FormData();
        formData.set('taskId', replica.id.toString());
        formData.set('archived', String(replica.archived));

        const response = await fetch(`${$page.url.pathname}?/archiveTask`, {
            method: 'POST',
            body: formData
        });

        const result = deserialize<{ message: string; tasks: Task[] }, { message: string }>(await response.text());

        if (result.type === 'failure') {
            // Optimistic update failover
            replica.archived = !replica.archived;
            item.task = { ...replica, archived: replica.archived };
            $tasks = oldTasks;
            return addToast({ type: 'error', message: result.data!.message });
        } else if (result.type === 'success') {
            $tasks = result.data!.tasks;
        }
    };

    const destroyEnhance: SubmitFunction = ({ formData }) => {
        formData.set('id', item.task.id!.toString());

        return ({ result }) => {
            if (result.type === 'failure') {
                return addToast({ type: 'error', message: result.data!.message });
            } else if (result.type === 'success') {
                // @ts-ignore
                addToast({ type: 'success', message: result.data!.message });
                changeSearchParams('id', null);
                $tasks = $tasks.filter((t) => t.id !== item.task.id);
            }
        };
    };

    const setDescription = async (value: string | null) => {
        replica.description = value;
        await edit();
        item.task = { ...replica, description: value };
    };
</script>

<header class="relative flex justify-between items-center w-full h-[60px] px-5 z-[110] dark:text-neutral-50">
    <button
        class="rounded-full"
        on:click={() => {
            changeSearchParams('id', null);
            if (categorySearchParam !== null && !$categories.includes(categorySearchParam)) {
                const searchParams = new URLSearchParams($page.url.searchParams);
                searchParams.delete('category');
                setTimeout(() => goto(`/app/tasks?${searchParams}`, { invalidateAll: true }), 400);
            }
        }}
    >
        <IconX />
    </button>
    <div class="flex gap-10 items-center">
        {#if replica.description !== null}
            <button class="rounded-full" on:click={() => setDescription(null)}>
                <IconNotesOff />
            </button>
        {:else}
            <button class="rounded-full" on:click={() => setDescription('')}>
                <IconNotes />
            </button>
        {/if}
        <CategoryChanger task={replica} />
        <button class="rounded-full" on:click={archive}>
            {#if replica.archived}
                <IconArchiveOff />
            {:else}
                <IconArchive />
            {/if}
        </button>
        <form method="post" action="?/destroy" use:enhance={destroyEnhance}>
            <Button.Danger variant="tertiary" type="submit" class="px-0 py-0 h-full border-0 rounded-none flex justify-start items-center gap-5">
                <IconTrash />
            </Button.Danger>
        </form>
    </div>
</header>
{#key replica}
    <TaskDetails task={replica} reminders={item.reminders} bind:showSettings on:close />
{/key}
