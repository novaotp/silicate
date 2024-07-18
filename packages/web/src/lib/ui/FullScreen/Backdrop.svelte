<script lang="ts">
    import { cn } from '$utils/cn';
    import { fade } from 'svelte/transition';

    export let z: number = 1000;
</script>

<!--
@component

A fullscreen backdrop effect that sits above the current UI.

-->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class={cn("fixed h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.1)]", $$restProps['class'] || '')}
    style="z-index: {z}"
    transition:fade
    on:click|stopPropagation
>
    <slot />
</div>
