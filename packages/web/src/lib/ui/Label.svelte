<script lang="ts">
    import { cn } from "$utils/cn";
    import type { HTMLLabelAttributes } from "svelte/elements";

    type $$Props = HTMLLabelAttributes;

    let forControl: $$Props["for"] = undefined;
    let className: $$Props["class"] = undefined;
    export { forControl as for, className as class }
</script>

<label for={forControl} class={cn("text-neutral-500 dark:text-neutral-50 text-sm", className)}>
    <slot />
</label>
