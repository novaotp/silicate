<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { IconPlus as AddIcon, IconSearch as SearchIcon } from '@tabler/icons-svelte';

	export let data: PageData;

	onMount(() => {
		document.title = 'Mes mémos - Silicate';
	});

	let search: string = data.search ?? '';

	const toTwoDigits = (number: number): string => {
		return number.toString().padStart(2, '0');
	};

	export const formattedDate = (date: Date): string => {
		const today = new Date();
		const hours = toTwoDigits(date.getHours());
		const minutes = toTwoDigits(date.getMinutes());

		if (
			date.getFullYear() === today.getFullYear() &&
			date.getMonth() === today.getMonth() &&
			date.getDate() === today.getDate()
		) {
			return `Aujourd'hui à ${hours}:${minutes}`;
		}

		const year = date.getFullYear();
		const month = toTwoDigits(date.getMonth() + 1);
		const day = toTwoDigits(date.getDate());

		return `${day}.${month}.${year} à ${hours}:${minutes}`;
	};
</script>

<div class="relative flex h-full w-full flex-col overflow-hidden px-5">
	<div class="relative flex h-[50px] w-full justify-between rounded-lg border border-gray-400">
		<input
			class="relative h-full w-[calc(100%-50px)] rounded-l-lg px-4 text-[14px]"
			name="search"
			placeholder="Cherche un mémo..."
			bind:value={search}
		/>
		<a
			href="/app/memos?search={search}"
			class="after:top-2/5 relative flex aspect-square h-full items-center
			justify-center after:absolute after:left-0 after:h-3/5
			after:w-[1px] after:bg-gray-400 after:content-['']"
		>
			<SearchIcon />
		</a>
	</div>
	<ul class="relative mt-5 flex max-h-[calc(100%-50px)] w-full flex-col overflow-y-scroll">
		{#each data.memos as memo}
			<li class="relative mb-3 min-h-[80px] w-full rounded-xl last-of-type:mb-0">
				<a
					href={`/app/memos/${memo.id}`}
					class="relative flex h-full w-full flex-col bg-blue-200 p-3"
				>
					<div class="relative flex w-full justify-between">
						<p>{memo.title}</p>
						<p>{formattedDate(memo.updatedAt)}</p>
					</div>
					<p
						class="relative mt-2 overflow-hidden text-ellipsis whitespace-nowrap bg-gray-500 text-xs"
					>
						{memo.content}
					</p>
				</a>
			</li>
		{:else}
			{#if data.search === ''}
				<p>Tu n'as pas encore créé de mémos.</p>
			{:else}
				<p>Aucun résultat trouvé pour la recherche.</p>
			{/if}
		{/each}
	</ul>
	<form method="post">
		<button
			class="absolute bottom-5 right-5 flex aspect-square w-[60px] items-center justify-center rounded-full bg-blue-500 text-white"
		>
			<AddIcon class="text-3xl" />
		</button>
	</form>
</div>
