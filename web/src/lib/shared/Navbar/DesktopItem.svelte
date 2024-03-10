<script lang="ts">
	import { type ComponentType } from 'svelte';

	export let icon: ComponentType;
	export let href: string;
	export let label: string;
</script>

<!--
@component

Renders a link for the floating menu.

* Includes an icon.
-->

<li
	class="relative flex w-full aspect-square items-center justify-center"
>
	<a
		{href}
		class="relative flex flex-col h-full w-full items-center justify-evenly gap-1 p-2 text-center rounded-md hover:bg-stone-400 text-xs"
	>
		<svelte:component this={icon} />
		<span>{label}</span>
	</a>
</li>
