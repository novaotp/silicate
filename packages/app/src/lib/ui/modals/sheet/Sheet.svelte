<script lang="ts">
	import Overlay from "$ui/layout/overlay/Overlay.svelte";
	import { cn } from "$utils/cn";
	import { fly, slide } from "svelte/transition";

    /** Must be bindable. */
    export let open: boolean;
    
    let className: string = "";
    export { className as class };
</script>

<!--
@component
Displays content from the side.
-->

{#if open}
    <Overlay on:click={() => (open = false)}>
        <article
            transition:fly={{ x: -100 }}
            class={cn("relative w-[300px] h-full bg-white shadow-[4px_0_8px_8px_rgba(0,0,0,0.1)]", className)}
        >
            <slot />
        </article>
    </Overlay>
{/if}
