<script lang="ts">
    import { cn } from '$utils/cn';
    import { fade } from 'svelte/transition';

    export let z: number = 1000;
</script>

<!--
@component
A fullscreen overlay effect that sits above the current UI.

Can pass an `on:click` event handler that fires when it is clicked (usually to close the component).

When self-contained, make sure to elevate the sibling components over the overlay.
-->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class={cn("fixed h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.2)]", $$restProps['class'] || '')}
    style="z-index: {z}"
    transition:fade
    on:click|self|stopPropagation
>
    <slot />
</div>
