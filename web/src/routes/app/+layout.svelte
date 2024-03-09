<script lang="ts">
	import Navigation from '$lib/shared/Navbar/Navigation.svelte';
</script>

<div class="relative h-full w-full flex flex-col md:flex-row">
	<Navigation />
	<main class="relative w-full h-[calc(100%-60px)] flex flex-col">
		<slot />
	</main>
</div>
