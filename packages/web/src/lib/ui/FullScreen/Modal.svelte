<script lang="ts">
    import { fly } from "svelte/transition";
</script>

<div role="dialog" class="fixed w-full h-full top-0 left-0 bg-white dark:bg-neutral-950 z-[100] overflow-auto" transition:fly={{ x: -100 }}>
    <slot />
</div>
