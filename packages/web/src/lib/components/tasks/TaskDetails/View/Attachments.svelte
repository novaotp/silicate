<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { addToast } from '$lib/stores/toast';
    import type { ApiResponse, ApiResponseWithData } from '$libs/types/ApiResponse';
    import IconPaperclip from '@tabler/icons-svelte/IconPaperclip.svelte';
    import IconPlus from '@tabler/icons-svelte/IconPlus.svelte';
    import { getContext } from 'svelte';
    import AttachmentComponent from './AttachmentComponent.svelte';
    import type { Attachment } from '$libs/models/Task';

    export let id: number;
    export let value: string | null;
    export let signal: AbortSignal;

    let attachments: Attachment[] = value ? JSON.parse(value) : [];

    const jwt = getContext<string>('jwt');

    let newAttachmentNode: HTMLInputElement;

    const handleNewAttachments = async (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        if (!event.currentTarget.files) {
            addToast({ type: "info", message: "Aucune ressource sélectionnée" });
            return;
        }

        const data = new FormData()
        for (const file of event.currentTarget.files) {
            let [filename, extension] = file.name.split(".")

            let index = 1;
            while (attachments.find(a => a.name === `${filename}.${extension}`) !== undefined) {
                filename = `${filename}(${index})`;
                index++;
            }

            data.append('attachments', file, `${filename}.${extension}`)
        }

        addToast({ type: "info", message: "Téléchargement des ressources" });

        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/tasks/${id}/attachment`, {
            method: 'POST',
            body: data,
            headers: {
                accept: 'application/json',
                authorization: jwt
            }
        });
        const result: ApiResponseWithData<Attachment[]> = await response.json();

        if (!result.success) {
            addToast({ type: 'error', message: result.message });
            return;
        }

        attachments = [...attachments, ...result.data];
        value = JSON.stringify(attachments);
        addToast({ type: "success", message: "Ressources téléchargées" })
    };

    const deleteAttachment = async (event: CustomEvent<string>) => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/tasks/${id}/attachment?name=${event.detail}`, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                authorization: jwt
            }
        });
        const result: ApiResponse = await response.json();

        if (!result.success) {
            addToast({ type: 'error', message: result.message });
            return;
        }

        attachments = attachments.filter(a => a.name !== event.detail);
        value = JSON.stringify(attachments);
        addToast({ type: "success", message: "Ressource supprimée avec succès" })
    };
</script>

<div class="relative w-full flex flex-col gap-3 text-neutral-500">
    <div class="flex gap-4">
        <IconPaperclip />
        <span>Fichier(s) joint(s) ({attachments?.length ?? 0})</span>
    </div>
    <div class="relative w-full flex flex-wrap justify-start items-start gap-3 text-black">
        {#each attachments as attachment}
            <AttachmentComponent {id} path={attachment.relativePathOnServer} name={attachment.name} {signal} on:delete={deleteAttachment} />
        {/each}
        <input bind:this={newAttachmentNode} on:change={handleNewAttachments} multiple type="file" class="hidden" />
        <button on:click={() => newAttachmentNode.click()} class="bg-neutral-100 rounded-lg p-4">
            <IconPlus class="text-neutral-700" />
        </button>
    </div>
</div>
