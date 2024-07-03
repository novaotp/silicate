<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { getContext } from 'svelte';
    import { byteConverter, toTitleCase } from './utils';
    import AttachmentPreview from './AttachmentPreview.svelte';
    import { addToast } from '$lib/stores/toast';
    import { getFileIcon } from './icons.AttachmentComponent';

    export let id: number;
    export const path: string = "";
    export let name: string;
    export let signal: AbortSignal;

    let loading: boolean = true;
    let showPreview: boolean = false;

    $: extension = name.split('.').at(-1)!;
    $: icon = getFileIcon(extension);

    $: fileBlobPromise = (async (name: string) => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/tasks/${id}/attachment?name=${name}`, {
            method: 'GET',
            headers: {
                authorization: jwt,
                'content-type': 'application/json'
            },
            signal
        });
        const blob = await response.blob();
        loading = false;
        return blob;
    })(name);

    const jwt = getContext<string>('jwt');

    /**
     * @see https://stackoverflow.com/a/59414837
     */
    const download = (file: Blob) => {
        let link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = name;
        link.click();
    };

    const openPreview = () => {
        if (loading) {
            addToast({ type: 'info', message: "Chargement de l'attachement" });
        } else {
            showPreview = true;
        }
    };
</script>

<button on:click={openPreview} class="relative flex justify-between items-center gap-5 min-w-40 px-4 py-2 rounded-lg bg-neutral-100">
    <div class="relative h-full flex justify-center items-center">
        <svelte:component this={icon} class="size-6 text-neutral-600" />
    </div>
    <div class="relative flex flex-col items-start w-full">
        <span class="text-ellipsis whitespace-nowrap overflow-hidden max-w-40 text-neutral-950">{name}</span>
        {#await fileBlobPromise}
            <p class="text-sm text-neutral-600">Chargement...</p>
        {:then blob}
            <div class="w-full flex text-neutral-500 text-sm">
                <span>{byteConverter(blob.size, 2)}</span>
                <span>&nbsp;-&nbsp;</span>
                <button on:click|stopPropagation={() => download(blob)}>Télécharger</button>
            </div>
            {#if showPreview}
                <AttachmentPreview {name} {blob} on:delete on:close={() => (showPreview = false)} />
            {/if}
        {:catch error}
            {#if error.name === "AbortError"}
                <p>La requête a été abandonnée.</p>
            {:else}
                <p>Une erreur est survenue lors du chargement de la ressource.</p>
            {/if}
        {/await}
    </div>
</button>
