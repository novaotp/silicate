<script lang="ts">
    export let variant: "primary" | "secondary" | "tertiary" = "primary";
    export let size: "small" | "medium" = "medium";
    export let type: "button" | "submit" = "button";

    const sizeClasses = {
        "small": "px-3 py-1 text-sm",
        "medium": "px-5 py-2 text-md"
    };

    const colorClasses = {
        "primary": "text-neutral-50 bg-primary-600",
        "secondary": "text-primary-600 bg-primary-100",
        "tertiary": "text-primary-600"
    }
</script>

<button {type} class="relative rounded {sizeClasses[size]} {colorClasses[variant]} {$$restProps['class'] || ''}" on:click>
    <slot />
</button>
