<script lang="ts">
    import { goto } from '$app/navigation';
    import AudioStreaming from '$components/tools/audio/AudioStreaming.svelte';
    import IconChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
    import type { PageServerData } from './$types';
    import { PUBLIC_APP_NAME } from '$env/static/public';

    export let data: PageServerData;
</script>

<svelte:head>
    <title>Streaming Audio - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div class="relative w-full h-full flex flex-col gap-5 p-5 pt-0">
    <button on:click={() => goto('/app/tools')} class="flex gap-5">
        <IconChevronLeft />
        <span>Retour</span>
    </button>
    {#await data.audios}
        <p>Chargement des audios...</p>
    {:then audios}
        <AudioStreaming {audios} />
    {/await}
</div>
