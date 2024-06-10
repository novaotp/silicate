<script lang="ts">
    export let variant: "primary" | "secondary" | "tertiary" = "primary";
    export let size: "small" | "medium" = "medium";

    const sizeClasses = {
        "small": "px-3 py-1 text-sm",
        "medium": "px-5 py-2 text-md"
    };

    const colorClasses = {
        "primary": "text-primary-950 bg-accent-warning-200",
        "secondary": "text-accent-warning-200 bg-primary-50 border border-accent-warning-200",
        "tertiary": ""
    }
</script>

<button class="relative rounded {sizeClasses[size]} {colorClasses[variant]} {$$restProps['class'] || ''}" on:click>
    <slot />
</button>
