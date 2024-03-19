<script lang="ts">
    import { fade } from "svelte/transition";
</script>

<!--
@component

A fullscreen backdrop effect that sits above the current UI.

-->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="fixed top-0 left-0 w-full h-full flex items-end bg-[rgba(0,0,0,0.1)] z-[100]" transition:fade>
    <slot />
</div>
