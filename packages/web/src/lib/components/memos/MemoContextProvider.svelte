<script lang="ts">
    import { setContext } from "svelte";
    import type { MemoPageContext } from "./utils";
    import { writable } from "svelte/store";
    import type { Memo } from "$libs/models/Memo";
    import NoMemo from "./NoMemo.svelte";
    import { Search, AddMemo, MemoList, MemoDetails } from ".";
    import { page } from "$app/stores";

    export let memos: Memo[];
    export let categories: string[];

    const { memos: _memos } = setContext<MemoPageContext>('page', {
        memos: writable(memos),
        categories: writable(categories)
    });

    $: search = $page.url.searchParams.get("search") ?? "";
</script>

{#if $_memos.length > 0 || search !== ""}
    <header class="relative w-full flex flex-col md:flex-row gap-5 justify-start md:justify-between items-center">
        <h1 class="relative self-start h-full flex items-center text-xl text-primary-950 dark:text-neutral-50">Mémos</h1>
        <div class="relative h-full w-full md:w-auto flex gap-5 items-center">
            <Search />
            <AddMemo />
        </div>
    </header>
    <div class="absolute md:hidden">
        <AddMemo />
    </div>
    <MemoList />
{:else}
    <NoMemo />
{/if}
<MemoDetails />
