<script lang="ts">
    export let axis: "x" | "y" = "x";

    $: styles = axis === "x" ? "w-full min-h-[1px]" : "h-full min-w-[1px]";
</script>

<div class="relative {styles} bg-neutral-100 {$$restProps['class'] || ''}"></div>
