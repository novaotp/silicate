<script lang="ts">
    import { cn } from "$utils/cn";
    import { scale, type ScaleParams } from "svelte/transition";

    export let options: ScaleParams = { start: 0.75 };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class={cn("relative bg-white rounded-lg shadow-2xl p-5", $$restProps['class'] || '')}
    on:click|stopPropagation
    transition:scale={options}
>
    <slot />
</div>
