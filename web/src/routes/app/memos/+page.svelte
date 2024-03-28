<script lang="ts">
    import Editor from '$lib/components/memos/Editor/Editor.svelte';
    import Sidebar from '$lib/components/memos/Sidebar/Sidebar.svelte';
    import { onMount } from 'svelte';
    import type { ActionData, PageData } from './$types';
    import { IconPlus as AddIcon } from '@tabler/icons-svelte';
    import { setSelectedMemoId } from '$lib/stores/memo';

    export let data: PageData;
    export let form: ActionData;

    onMount(() => {
        if (form?.id) {
            setSelectedMemoId(form.id);
        }
    });

    let search: string = data.search ?? '';
</script>

<svelte:head>
    <title>Mes mémos - Silicate</title>
</svelte:head>

<div class="relative flex w-full h-full flex-col lg:flex-row gap-5 lg:gap-10 overflow-hidden">
    {#await data.memos}
        <p>Chargement de tes mémos...</p>
    {:then memos}
        <Sidebar bind:search {memos} />
    {:catch}
        <p>Une erreur est survenue lors du chargement. Réessayez plus tard.</p>
    {/await}
    <Editor />
    <form method="post" class="md:hidden">
        <button
            class="fixed bottom-5 right-5 flex aspect-square w-[60px] items-center justify-center rounded-lg bg-blue-500 drop-shadow-[0_0px_8px_rgba(0,0,0,0.4)] text-white"
        >
            <AddIcon class="text-3xl" />
        </button>
    </form>
</div>
