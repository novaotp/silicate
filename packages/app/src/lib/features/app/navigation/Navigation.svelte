<script lang="ts">
	import { goto } from '$app/navigation';
	import MobileNavigation from './MobileNavigation.svelte';
	import DesktopNavigation from './DesktopNavigation.svelte';
	import { innerWidth } from '$utils/inner-width';

	let isMenuSheetOpen: boolean = false;

	const onNavigate = (href: string) => {
		isMenuSheetOpen = false;
		goto(href);
	};
</script>

{#if $innerWidth < 768}
    <MobileNavigation bind:isMenuSheetOpen on:navigate={(event) => onNavigate(event.detail)} />
{:else}
    <DesktopNavigation bind:isMenuSheetOpen on:navigate={(event) => onNavigate(event.detail)} />
{/if}
