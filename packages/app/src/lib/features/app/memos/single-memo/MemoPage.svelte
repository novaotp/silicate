<script lang="ts">
    import { getContext } from 'svelte';
    import { page } from '$app/stores';
	import MobileView from './mobile/MobileView.svelte';
	import DesktopView from './desktop/DesktopView.svelte';
	import type { Writable } from 'svelte/store';
	import type { Memo } from '$common/models/memo';

    const memos = getContext<Writable<Memo[]>>('memos');
    
    let showSettings: boolean = false;

    $: viewedMemoId = $page.url.searchParams.get('id');
    $: viewedMemo = $memos.find(memo => memo.id.toString() === viewedMemoId);
</script>

<!-- Ensures that the memo id is valid. -->
{#if viewedMemoId && viewedMemo}
    <MobileView bind:showSettings />
    <DesktopView bind:showSettings />
{/if}
