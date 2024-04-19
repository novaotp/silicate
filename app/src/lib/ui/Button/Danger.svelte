<script lang="ts">
    export let variant: "primary" | "secondary" | "tertiary" = "primary";
    export let size: "small" | "medium" = "medium";

    const sizeClasses = {
        "small": "px-3 py-1 text-sm",
        "medium": "px-5 py-2 text-md"
    };

    const colorClasses = {
        "primary": "text-neutral-50 bg-accent-danger-500",
        "secondary": "text-accent-danger-500 bg-accent-danger-50 border border-accent-danger-500",
        "tertiary": "text-neutral-500"
    }
</script>

<button class="relative rounded {sizeClasses[size]} {colorClasses[variant]} {$$restProps['class'] || ''}" on:click>
    <slot />
</button>
