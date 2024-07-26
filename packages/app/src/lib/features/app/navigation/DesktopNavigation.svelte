<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { page } from '$app/stores';
	import IconMenu2 from '@tabler/icons-svelte/icons/menu-2';
	import IconX from '@tabler/icons-svelte/icons/x';
	import { navigationItems } from './items';
	import { Avatar } from '$ui/display';
	import type { Writable } from 'svelte/store';
	import type { User } from '$common/models/user';

	export let isMenuSheetOpen: boolean;

	const user = getContext<Writable<User>>('user');

	const dispatch = createEventDispatcher<{ navigate: string }>();
</script>

<nav
	class="hidden md:flex flex-col justify-between items-center h-full {isMenuSheetOpen
		? 'w-[200px]'
		: 'w-20'}
    duration-300 overflow-x-hidden ease-in-out py-5 bg-neutral-100 dark:bg-neutral-900"
>
	<ul class="relative w-full flex flex-col justify-start gap-3">
		<li class="relative flex w-full items-center justify-center">
			<button
				on:click={() => (isMenuSheetOpen = !isMenuSheetOpen)}
				class="relative flex h-full w-full items-center justify-start py-[10px]
                text-center rounded-md hover:bg-stone-400 dark:text-neutral-50 text-sm"
			>
				<span class="relative min-w-20 h-full flex justify-center items-center">
					{#if !isMenuSheetOpen}
						<IconMenu2 class="min-w-6 min-h-6" />
					{:else}
						<IconX class="min-w-6 min-h-6" />
					{/if}
				</span>
				<span>Menu</span>
			</button>
		</li>
		{#each navigationItems as { href, label, icon }}
			<li class="relative flex w-full items-center justify-center">
				<button
					on:click={() => dispatch('navigate', href)}
					class="link group relative flex h-full w-full items-center justify-start py-[10px]
                            text-center text-sm overflow-hidden dark:text-neutral-50"
					class:current={$page.url.pathname === href}
				>
					<span class="relative min-w-20 h-full flex justify-center items-center">
						<svelte:component
							this={icon}
							class="group-hover:text-primary-600 group-hover:dark:text-primary-400 min-w-6 min-h-6"
						/>
					</span>
					<span class="group-hover:text-primary-600 group-hover:dark:text-primary-400">{label}</span
					>
				</button>
			</li>
		{/each}
	</ul>
	<ul class="relative w-full flex flex-col gap-3">
		<li class="relative flex w-full max-h-10 items-center justify-center">
			<a
				href="/settings"
				on:click={() => (isMenuSheetOpen = false)}
				class="link group relative flex h-full w-full items-center justify-start text-center text-sm overflow-hidden"
				class:current={$page.url.pathname === '/settings'}
			>
				<span class="relative min-w-20 max-w-20 h-full min-h-10 flex justify-center items-center">
					<Avatar user={$user} class="h-full aspect-square" textSize={14} />
				</span>
				<span
					class="group-hover:text-primary-600 group-hover:dark:text-primary-400 dark:text-neutral-50"
					>Paramètres</span
				>
			</a>
		</li>
	</ul>
</nav>

<style lang="postcss">
	.current {
		@apply text-primary-600 dark:text-primary-400;
	}

	.current::before {
		@apply content-[""] absolute top-0 left-[1px] w-[2px] h-full bg-primary-600 dark:bg-primary-400;
	}
</style>
