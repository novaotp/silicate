<script lang="ts">
    import { getContext } from "svelte";
	import { page } from "$app/stores";
	import { AddMemo, Categories, MemoList, NoMemo, Search } from "./components";
	import MemoPage from "./single-memo/MemoPage.svelte";
	import type { Writable } from "svelte/store";
	import type { Memo } from "$common/models/memo";

    const memos = getContext<Writable<Memo[]>>("memos");

    $: search = $page.url.searchParams.get("search");
</script>

{#if $memos.length > 0 || search !== null}
    <header class="relative w-full flex flex-col md:flex-row gap-5 justify-start md:justify-between items-center">
        <h1 class="relative self-start h-full flex items-center text-xl text-primary-950 dark:text-neutral-50">Mémos</h1>
        <div class="relative h-full w-full md:w-auto flex gap-5 items-center">
            <Search />
            <AddMemo class="hidden md:flex" />
        </div>
    </header>
    <AddMemo class="fixed bottom-5 right-5 size-[60px] z-[100]" />
    {#if $memos.length > 0}
        <Categories />
    {/if}
    <MemoList />
{:else}
    <NoMemo />
{/if}

<MemoPage />
