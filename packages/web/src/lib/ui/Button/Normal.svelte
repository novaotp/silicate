<script lang="ts">
    import { cn } from "$utils/cn";

    export let variant: "primary" | "secondary" | "tertiary" = "primary";
    export let size: "small" | "medium" = "medium";
    export let type: "button" | "submit" = "button";
    export let disabled: boolean = false;

    const sizeClasses = {
        "small": "px-3 py-1 text-sm",
        "medium": "px-5 py-2 text-md"
    };

    const colorClasses = {
        "primary": "text-neutral-50 bg-primary-600 dark:bg-primary-500",
        "secondary": "text-primary-600 bg-primary-100 dark:text-primary-500",
        "tertiary": "text-primary-600"
    }
</script>

<button
    {type}
    {disabled}
    on:click
    class={cn("relative rounded-lg", sizeClasses[size], colorClasses[variant], $$restProps['class'] || '')}
>
    <slot />
</button>
