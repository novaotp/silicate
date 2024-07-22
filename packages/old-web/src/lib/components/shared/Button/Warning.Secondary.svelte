<script lang="ts">
    export let size: "small" | "medium" = "medium";

    $: textSize = size === "small" ? "px-3 py-1 text-sm" : "px-5 py-2 text-md";
</script>

<button class="relative rounded-smd text-accent-warning-200 bg-primary-50 border border-accent-warning-200 {textSize} {$$restProps['class'] || ''}" on:click>
    <slot />
</button>
