<script lang="ts">
    import { getContext } from 'svelte';
    import { page } from '$app/stores';
	import MobileView from './mobile/MobileView.svelte';
	import DesktopView from './desktop/DesktopView.svelte';
	import type { Writable } from 'svelte/store';
	import type { Memo } from '$common/models/memo';
	import { innerWidth } from '$utils/inner-width';

    const memos = getContext<Writable<Memo[]>>('memos');
    
    let showSettings: boolean = false;

    $: viewedMemoId = $page.url.searchParams.get('id');
    $: viewedMemo = $memos.find(memo => memo.id.toString() === viewedMemoId);
</script>

<!-- viewedMemoId && viewedMemo : Ensures that the memo id is valid. -->
 <!-- $innerWidth is to make sure the animations are still played. -->
{#if viewedMemoId && viewedMemo && $innerWidth > 768}
    <DesktopView bind:showSettings />
{:else if viewedMemoId && viewedMemo && $innerWidth < 768}
    <MobileView bind:showSettings />
{/if}
