<script lang="ts">
    import { cn } from "$lib/utils/cn";

    export let variant: "primary" | "secondary" | "tertiary" = "primary";
    export let size: "small" | "medium" = "medium";
    export let type: "button" | "submit" = "button";

    const sizeClasses = {
        "small": "px-3 py-1 text-sm",
        "medium": "px-5 py-2 text-md"
    };

    const colorClasses = {
        "primary": "text-neutral-50 bg-accent-danger-500",
        "secondary": "text-accent-danger-500 bg-accent-danger-50 dark:text-accent-danger-400 dark:bg-neutral-700",
        "tertiary": "text-accent-danger-500 dark:text-accent-danger-400"
    }
</script>

<button {type} class={cn("relative rounded-lg", sizeClasses[size], colorClasses[variant], $$restProps['class'] || '')} on:click>
    <slot />
</button>
