<script lang="ts">
	import type { Memo } from "$common/models/memo";
	import { changeSearchParams } from "$utils/change-search-params";

    export let memo: Memo;

    const showMemo = (id: number) => {
        return changeSearchParams('id', id);
    };
</script>

<button
	class="relative p-5 gap-[10px] flex flex-col justify-between items-start border border-neutral-300 dark:border-none dark:bg-neutral-800 rounded-lg"
	on:click={() => showMemo(memo.id)}
>
	<h2 class="text-neutral-950 text-start dark:text-neutral-50">{memo.title}</h2>
	{#if memo.content !== ''}
		<div
            spellcheck="false"
			class="preview-content relative w-full text-xs text-neutral-500 text-justify overflow-y-hidden text-ellipsis pointer-events-none"
		>
			{@html memo.content}
		</div>
	{/if}
</button>
