<script lang="ts">
    import { fly } from 'svelte/transition';
</script>

<!--
@component

A full screen modal with a condition to show it or not.

-->

<div role="dialog" class="fixed w-full h-full top-0 left-0 bg-white" transition:fly={{ x: -100 }}>
    <slot />
</div>
