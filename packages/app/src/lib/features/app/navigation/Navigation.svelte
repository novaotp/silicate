<script lang="ts">
	import { Sheet } from '$ui/modals';
	import IconMenu from '@tabler/icons-svelte/icons/menu';
	import { navigationItems } from './items';
	import { goto } from '$app/navigation';

	let isMenuSheetOpen: boolean = true;

	const onNavigate = (href: string) => {
		isMenuSheetOpen = false;
		goto(href);
	};
</script>

<nav class="relative w-full h-20 flex justify-between items-center p-5">
	<button on:click={() => (isMenuSheetOpen = true)}>
		<IconMenu />
	</button>
	<Sheet bind:open={isMenuSheetOpen} class="flex flex-col">
		<div role="banner" class="relative w-full h-[150px] bg-primary-600 px-5 flex flex-col justify-center">
			<h2 class="text-white text-2xl font-semibold">Chalarí</h2>
		</div>
		<menu class="relative w-full flex-grow flex flex-col py-2">
			{#each navigationItems as { href, label, icon }}
				<li
					class="relative flex w-full items-center justify-center h-[50px]"
				>
					<button
						on:click={() => onNavigate(href)}
						class="relative flex h-full w-full items-center justify-start px-5 gap-5 dark:text-neutral-100"
					>
						<svelte:component this={icon} class="stroke-[1.5]" />
						<span>{label}</span>
					</button>
				</li>
			{/each}
		</menu>
	</Sheet>
</nav>
