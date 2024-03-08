<script lang="ts">
	import Navigation from '$lib/shared/Navbar/Navigation.svelte';
</script>

<Navigation />
<main class="relative w-full h-[calc(100%-60px)] flex flex-col">
	<slot />
</main>
