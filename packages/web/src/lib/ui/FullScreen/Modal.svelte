<script lang="ts">
    import { cn } from "$utils/cn";
    import { fly } from "svelte/transition";
</script>

<div 
    role="dialog"
    class={cn("fixed w-full h-full top-0 left-0 bg-white dark:bg-neutral-950 z-[100] overflow-auto", $$restProps["class"])}
    transition:fly={{ x: -100 }}
>
    <slot />
</div>
