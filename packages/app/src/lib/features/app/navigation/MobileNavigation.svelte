<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import IconMenu from '@tabler/icons-svelte/icons/menu';
	import { navigationItems } from './items';
	import { Sheet } from '$ui/modals';
	import { Avatar } from '$ui/display';
	import type { Writable } from 'svelte/store';
	import type { User } from '$common/models/user';

	export let isMenuSheetOpen: boolean;

	const user = getContext<Writable<User>>('user');

	const dispatch = createEventDispatcher<{ navigate: string }>();
</script>

<nav class="relative w-full h-20 flex justify-between items-center p-5">
	<div class="relative w-full flex justify-between">
		<button on:click={() => (isMenuSheetOpen = true)}>
			<IconMenu class="dark:text-white" />
		</button>
		<button on:click={() => dispatch('navigate', '/settings')}>
			<Avatar user={$user} class="h-10 aspect-square" textSize={14} />
		</button>
	</div>
	<Sheet bind:open={isMenuSheetOpen} class="flex flex-col" let:closeWithTransition>
		<div
			role="banner"
			class="relative w-full h-[150px] bg-primary-600 dark:bg-primary-500 px-5 flex flex-col justify-center"
		>
			<h2 class="text-white text-2xl font-semibold">Chalarí</h2>
		</div>
		<menu class="relative w-full flex-grow flex flex-col py-2 bg-white dark:bg-neutral-900">
			{#each navigationItems as { href, label, icon }}
				<li class="relative flex w-full items-center justify-center h-[50px]">
					<button
						on:click={() => {
                            closeWithTransition();
                            dispatch('navigate', href)
                        }}
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
