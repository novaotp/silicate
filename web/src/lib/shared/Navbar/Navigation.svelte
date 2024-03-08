<script lang="ts">
	import {
		IconMenu as MenuIcon,
		IconX as CloseIcon,
		IconArticle as MemoIcon,
		IconStar as GradeIcon
	} from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	import Item from './Item.svelte';

	let dialog: HTMLDialogElement;
	onMount(() => {
		dialog = document.getElementById('menu-dialog')! as HTMLDialogElement;
	});

	const openMenu = () => dialog.showModal();
	const closeMenu = () => dialog.close();
</script>

<nav class="relative w-full h-[60px] flex justify-between px-5 py-[10px]">
	<button
		on:click={openMenu}
		class="relative h-full aspect-square flex justify-center items-center"
	>
		<MenuIcon />
	</button>
	<div></div>
</nav>
<dialog
	id="menu-dialog"
	class="fixed z-50 m-auto w-[90%] rounded-md p-5 shadow-2xl duration-300 opacity-0 open:opacity-100"
>
	<header class="relative mb-5 flex h-10 w-full items-center justify-between">
		<h2 class="text-2xl">Menu</h2>
		<button on:click={closeMenu} class="relative aspect-square h-full flex justify-center items-center">
			<CloseIcon />
		</button>
	</header>
	<menu>
		<Item on:close={closeMenu} href="/app/memos" label="Mémos" icon={MemoIcon} />
		<Item on:close={closeMenu} href="/app/gradebooks" label="Carnets de notes" icon={GradeIcon} />
	</menu>
</dialog>
