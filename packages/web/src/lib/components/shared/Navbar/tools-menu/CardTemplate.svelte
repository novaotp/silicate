<script lang="ts">
    import type { ComponentType } from "svelte";

    export let icon: ComponentType;
</script>

<!--
@component
A template for the tool menu's cards.
-->

<div class="relative w-full p-5 flex gap-5">
    <div class="relative my-auto w-10 aspect-square bg-neutral-100 grid place-items-center rounded-lg">
        <svelte:component this={icon} />
    </div>
    <div class="relative flex-grow h-full flex flex-col gap-[10px]">
        <slot />
    </div>
</div>
