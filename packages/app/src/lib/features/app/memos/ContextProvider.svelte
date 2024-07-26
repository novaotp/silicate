<script lang="ts">
    import { setContext } from "svelte";
    import { writable } from "svelte/store";
    import { page } from "$app/stores";
	import type { Memo } from "$common/models/memo";

    export let memos: Memo[];
    export let categories: string[];

    setContext('memos', writable(memos));
    setContext('categories', writable(categories));
</script>

<slot />
