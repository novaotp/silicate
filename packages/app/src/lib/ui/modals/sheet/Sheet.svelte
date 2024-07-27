<script lang="ts">
	import { cn } from '$utils/cn';
	import Overlay from '$ui/layout/overlay/Overlay.svelte';
	import { fly } from 'svelte/transition';

	/** Must be bindable. */
	export let open: boolean;

	const MIN_SWIPE_DISTANCE = 60;

	let className: string = '';
	export { className as class };

	let startTouchX: number = 0;
	let currentTouchX: number = 0;
	let endTouchX: number = 0;
	let translateX: number = 0;
	let isSwiping: boolean = false;
	let articleNode: HTMLElement;

	const handleTouchStart = (event: TouchEvent) => {
		startTouchX = event.touches[0]?.clientX ?? 0;
		currentTouchX = startTouchX;
		isSwiping = true;
		articleNode.style.transition = 'none'; // Disable transition during swipe
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (isSwiping) {
			currentTouchX = event.touches[0]?.clientX ?? 0;
			translateX = Math.min(0, currentTouchX - startTouchX);
		}
	};

	const handleTouchEnd = (event: TouchEvent) => {
		endTouchX = event.changedTouches[0]?.clientX ?? 0;
		isSwiping = false;

		// Enable transition for smooth animation only when not manually dragging
		articleNode.style.transition = 'transform 0.3s ease';

		if (startTouchX - endTouchX > MIN_SWIPE_DISTANCE) {
			translateX = -300; // Move sheet completely out of view
			setTimeout(() => {
				open = false;
				translateX = 0; // Reset translateX for the next open
			}, 400); // Match the transition duration
		} else {
			translateX = 0; // Reset position if swipe threshold is not met
		}

		startTouchX = 0;
		currentTouchX = 0;
	};

    const closeWithTransition = () => {
        // Enable transition for smooth animation only when not manually dragging
        articleNode.style.transition = 'transform 0.4s ease';

        translateX = -300; // Move article completely out of view
        setTimeout(() => {
            open = false;
            translateX = 0; // Reset translateX for the next open
        }, 400); // Match the transition duration
    };
</script>

<!--
@component
Displays content from the side.
-->

{#if open}
	<Overlay
		on:click={closeWithTransition}
		z={2}
	/>
	<article
		bind:this={articleNode}
		in:fly={{ x: -100 }}
		on:touchstart={handleTouchStart}
		on:touchmove={handleTouchMove}
		on:touchend={handleTouchEnd}
		class={cn(
			'fixed top-0 left-0 w-[300px] h-full bg-white shadow-[4px_0_8px_8px_rgba(0,0,0,0.1)]',
			className
		)}
		style="transform: translateX({translateX}px); z-index: 3;"
	>
		<slot {closeWithTransition} />
	</article>
{/if}
