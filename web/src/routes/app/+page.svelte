<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { addToast } from '$stores/toast';

	export let data: PageData;

	onMount(() => {
		document.title = 'Dashboard - Silicate';
	});
</script>

{#if !data.user}
	<p>Something went wrong.</p>
{:else}
    {@const { firstName, lastName } = data.user}
	<h1>Salut {firstName} {lastName}</h1>
{/if}
