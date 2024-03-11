<script lang="ts">
	import Navigation from '$lib/shared/Navbar/Navigation.svelte';
</script>

<div class="relative h-full w-full flex flex-col md:flex-row">
	<Navigation />
	<div class="relative w-full h-[calc(100%-60px)] md:h-full flex flex-col">
		<slot />
	</div>
</div>
