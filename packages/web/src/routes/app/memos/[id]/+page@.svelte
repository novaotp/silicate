<script lang="ts">
    import type { PageData } from './$types';
    import MobileEditor from '$lib/components/memos/Editor/Editor.mobile.svelte';

    export let data: PageData;

    const title: string = data?.memo?.title ?? "Erreur";
</script>

<svelte:head>
    <title>{title} - Silicate</title>
</svelte:head>

{#if data.data?.dbError || !data.memo}
    <p>Une erreur est survenue : {data.data.dbError}</p>
{:else}
    <MobileEditor memo={data.memo} />
{/if}
