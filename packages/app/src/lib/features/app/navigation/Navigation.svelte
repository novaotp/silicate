<script lang="ts">
	import { goto } from '$app/navigation';
	import MobileNavigation from './MobileNavigation.svelte';
	import DesktopNavigation from './DesktopNavigation.svelte';

	let isMenuSheetOpen: boolean = false;

	const onNavigate = (href: string) => {
		isMenuSheetOpen = false;
		goto(href);
	};
</script>

<MobileNavigation bind:isMenuSheetOpen on:navigate={(event) => onNavigate(event.detail)} />
<DesktopNavigation bind:isMenuSheetOpen on:navigate={(event) => onNavigate(event.detail)} />
