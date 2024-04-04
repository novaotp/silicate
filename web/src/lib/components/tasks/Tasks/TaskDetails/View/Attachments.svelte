<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { PageContext } from '$lib/components/tasks/types';
    import { addToast } from '$lib/stores/toast';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { IconPaperclip, IconPlus } from '@tabler/icons-svelte';
    import { getContext } from 'svelte';
    import { fetchTasks } from '../utils';
    import { page } from '$app/stores';
    import AttachmentComponent from './AttachmentComponent.svelte';
    import type { Attachment } from '$libs/models/Task';

    export let id: number;
    export let value: string | null;

    let attachments: Attachment[] = value ? JSON.parse(value) : [];

    const { tasks } = getContext<PageContext>('page');
    const jwt = getContext<string>('jwt');

    $: category = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';

    let newAttachmentNode: HTMLInputElement;

    const handleFiles = async (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                'existingAttachments': attachments,
                'attachments': event.currentTarget.files
            }),
            headers: {
                accept: 'application/json',
                authorization: jwt,
                contentType: 'multipart/form-data'
            }
        });
        const { success, message }: ApiResponse = await response.json();

        if (!success) {
            addToast({ type: 'error', message });
            return;
        }

        const updatedTasks = await fetchTasks(jwt, category, search);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
    };
</script>

<div class="relative w-full flex flex-col gap-3 text-gray-500">
    <div class="flex gap-4">
        <IconPaperclip />
        <span>Fichier(s) joint(s) ({attachments?.length ?? 0})</span>
    </div>
    <div class="relative w-full flex flex-wrap justify-start items-start gap-3 text-black">
        {#each attachments as attachment}
            <AttachmentComponent path={attachment.relativePathOnServer} name={attachment.name} />
        {/each}
        <input bind:this={newAttachmentNode} on:change={handleFiles} multiple type="file" class="hidden" />
        <button on:click={() => newAttachmentNode.click()} class="border border-gray-300 rounded-lg p-4"><IconPlus /></button>
    </div>
</div>
