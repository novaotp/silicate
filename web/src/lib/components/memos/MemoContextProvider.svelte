<script lang="ts">
    import { setContext } from "svelte";
    import type { MemoPageContext } from "./utils";
    import { writable } from "svelte/store";
    import type { Memo } from "$libs/models/Memo";

    export let memos: Memo[];
    export let categories: string[];

    setContext<MemoPageContext>('page', {
        memos: writable(memos),
        categories: writable(categories)
    });
</script>

<slot />
