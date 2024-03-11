<script lang="ts">
    import List from './List.svelte';
    import type { Memo } from '$libs/models/Memo';
    import Header from './Header.svelte';

    export let search: string;
    export let memos: Memo[] | undefined;
</script>

<sidebar
    class="relative flex w-full h-full lg:min-w-[320px] lg:max-w-[320px] p-5 lg:flex flex-col lg:flex-col justify-start gap-10 border-r border-stone-300"
>
    <Header bind:search />
    <List {search} {memos} />
</sidebar>
