<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { getContext } from 'svelte';
    import { byteConverter, toTitleCase } from './utils';
    import * as AllIcons from '@tabler/icons-svelte';
    import AttachmentPreview from './AttachmentPreview.svelte';
    import { addToast } from '$lib/stores/toast';

    export let id: number;
    export const path: string = "";
    export let name: string;

    $: extension = name.split('.').at(-1)!;

    let loading: boolean = true;
    let showPreview: boolean = false;

    $: fileBlobPromise = (async (name: string) => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}/attachment?name=${name}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: jwt,
                'content-type': 'application/json'
            }
        });
        const blob = await response.blob();
        loading = false;
        return blob;
    })(name);

    const jwt = getContext<string>('jwt');

    $: icon = ((extension: string) => {
        const iconKey = `IconFileType${toTitleCase(extension)}`;

        if (Object.keys(AllIcons).includes(iconKey)) {
            /* @ts-ignore */
            return AllIcons[iconKey];
        } else {
            return AllIcons['IconFileTypeTxt'];
        }
    })(extension);

    /**
     * @see https://stackoverflow.com/a/59414837
     */
    const download = (file: Blob) => {
        let link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = name;
        link.click();
    };

    const onClick = () => {
        if (loading) {
            addToast({ type: 'info', message: "Chargement de l'attachement" });
        } else {
            showPreview = true;
        }
    };
</script>

<button on:click={onClick} class="relative flex justify-between items-center gap-5 min-w-40 max-w-80 px-4 py-2 rounded-lg border border-gray-300">
    <div class="relative h-full flex justify-center items-center">
        <svelte:component this={icon} class="size-6" />
    </div>
    <div class="relative flex flex-col items-start max-w-40">
        <span class="text-ellipsis whitespace-nowrap overflow-hidden max-w-40">{name}</span>
        {#await fileBlobPromise}
            <p class="text-sm text-gray-500">Chargement...</p>
        {:then blob}
            <div class="flex text-gray-500 text-sm">
                <span>{byteConverter(blob.size, 2)}</span>
                <span>&nbsp;-&nbsp;</span>
                <button on:click|stopPropagation={() => download(blob)}>Télécharger</button>
            </div>
            {#if showPreview}
                <AttachmentPreview {name} {blob} on:delete on:close={() => (showPreview = false)} />
            {/if}
        {:catch}
            <p>Une erreur est survenue lors du chargement de la ressource.</p>
        {/await}
    </div>
</button>
