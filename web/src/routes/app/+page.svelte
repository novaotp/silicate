<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ firstName, lastName } = data.user);
</script>

<svelte:head>
	<title>Dashboard - Silicate</title>
</svelte:head>

{#if !data.user}
	<p>Something went wrong.</p>
{:else}
	<h1>Salut {firstName} {lastName}</h1>
{/if}
