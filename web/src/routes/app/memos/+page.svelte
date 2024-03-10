<script lang="ts">
	import Options from '$/src/lib/memos/Options.svelte';
    import View from '$/src/lib/memos/View.svelte';
	import type { PageData } from './$types';
	import { IconPlus as AddIcon } from '@tabler/icons-svelte';

	export let data: PageData;

	let search: string = data.search ?? '';
	let order: string = data.order ?? "";
</script>

<svelte:head>
	<title>Mes mémos - Silicate</title>
</svelte:head>

<div class="relative flex h-full w-full flex-col lg:flex-row p-5 gap-5">
	<Options bind:search bind:order />
	{#await data.memos}
		<p>Chargement de tes mémos...</p>
	{:then memos}
		<View {search} {memos} {order} />
	{:catch}
		<p>Une erreur est survenue lors du chargement. Réessayez plus tard.</p>
	{/await}
	<form method="post">
		<button
			class="absolute bottom-5 right-5 flex aspect-square w-[60px] items-center justify-center rounded-full bg-blue-500 text-white"
		>
			<AddIcon class="text-3xl" />
		</button>
	</form>
</div>
