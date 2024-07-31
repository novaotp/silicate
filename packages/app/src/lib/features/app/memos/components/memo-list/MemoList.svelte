<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { Masonry } from '$ui/layout';
	import MemoListItem from './MemoListItem.svelte';
	import type { Writable } from 'svelte/store';
	import type { Memo } from '$common/models/memo';

	const memos = getContext<Writable<Memo[]>>('memos');

	$: search = $page.url.searchParams.get('search');
	$: pinnedMemos = $memos.filter((memo) => memo.isPinned);
	$: unpinnedMemos = $memos.filter((memo) => !memo.isPinned);
</script>

<div class="relative w-[min(100%,800px)] h-full mx-auto flex flex-col gap-5">
	{#if $memos.length === 0 && search !== null}
		<div
			class="relative w-full h-full flex flex-col md:flex-row-reverse justify-center items-center"
		>
			<img
				src="/illustrations/no-results.png"
				alt="Illustration : Pas de mémos trouvés"
				class="w-3/5 xsm:w-1/2 sm:2/5 self-center"
			/>
			<div class="relative mx-auto flex flex-col justify-center items-start xsm:items-center gap-5">
				<h2 class="text-2xl xsm:text-center max-w-[400px] dark:text-neutral-50">
					Désolé, nous n'avons trouvé aucun mémo pour {search}
				</h2>
				<p class="text-neutral-500 dark:text-neutral-400 max-w-[350px] xsm:text-center">
					Essaie de chercher avec un autre terme.
				</p>
			</div>
		</div>
	{:else if $memos.length === 0 && search === null}
		<p>Vous n'avez aucun mémo !</p>
	{:else}
		{#if pinnedMemos.length > 0}
			<div class="flex flex-col gap-[10px]">
				<h2 class="dark:text-neutral-50">Mémos épinglés</h2>
				<Masonry items={$memos}>
					{#each pinnedMemos as memo (memo.id)}
						<MemoListItem {memo} />
					{/each}
				</Masonry>
			</div>
		{/if}
		{#if unpinnedMemos.length > 0}
			<div class="flex flex-col gap-[10px] pb-5">
				{#if pinnedMemos.length > 0 && unpinnedMemos.length > 0}
					<h2 class="dark:text-neutral-50">Autres</h2>
				{/if}
				<Masonry items={$memos}>
					{#each unpinnedMemos as memo (memo.id)}
						<MemoListItem {memo} />
					{/each}
				</Masonry>
			</div>
		{/if}
	{/if}
</div>
