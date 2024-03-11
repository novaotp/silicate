<script lang="ts">
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import type { Memo } from "$libs/models/Memo";
    import type { ApiResponseWithData } from "$libs/types/ApiResponse";
    import { selectedMemoId } from "$stores/memo";
    import Content from "./Content.svelte";

    let loading: boolean = false;
    let memo: Memo | undefined = undefined;

    let bold: boolean = false;
    let italic: boolean = false;

    let isPreview: boolean = false;

    selectedMemoId.subscribe(async (newId) => {
        if (!newId) return;

        memo = undefined;

        loading = true;

        const response = await fetch(`${PUBLIC_BACKEND_URL}/memos/${newId}`);
        const { data }: ApiResponseWithData<Memo> = await response.json();

        memo = { ...data };
        loading = false;
    });
</script>

<main class="relative hidden flex-col lg:flex h-full flex-grow p-5">
    {#if !$selectedMemoId || !memo}
        <p>Choisissez un mémo pour pouvoir l'éditer.</p>
    {:else}
        <header class="relative w-full h-20 mb-10 bg-indigo-700">
            <button on:click={() => (isPreview = !isPreview)}>
                { isPreview ? "Show editor" : "Show preview" }
            </button>
        </header>
        {@const { tag, title, content, lastChange } = memo}
        <h1>{title}</h1>
        <Content bind:content={memo.content} {bold} {italic} {isPreview} />
        <p>Dernière modification : {new Date(lastChange).toLocaleString("fr-CH")}</p>
    {/if}
    <div class="flex gap-5">
        <button on:click={() => (bold = !bold)} class="bg-blue-600">
            Gras | mtn : {bold}
        </button>
        <button on:click={() => (italic = !italic)} class="bg-blue-600">
            Italique | mtn : {italic}
        </button>
    </div>
</main>
