<script lang="ts">
    import { fly, type FlyParams } from "svelte/transition";

    export let options: FlyParams = { y: 100 };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="relative bg-white rounded-lg shadow-2xl p-5 {$$restProps['class'] || ''}"
    on:click|stopPropagation
    transition:fly={options}
>
    <slot />
</div>
