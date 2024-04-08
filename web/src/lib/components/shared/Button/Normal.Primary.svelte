<script lang="ts">
    export let size: "small" | "medium" = "medium";

    $: textSize = size === "small" ? "px-3 py-1 text-sm" : "px-5 py-2 text-md";
</script>

<button class="relative rounded-smd text-neutral-50 bg-primary-600 {textSize} {$$restProps['class'] || ''}">
    <slot />
</button>
