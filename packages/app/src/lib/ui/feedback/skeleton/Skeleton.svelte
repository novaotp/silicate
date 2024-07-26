<script lang="ts">
	import { cn } from "$utils/cn";

    let className: string | undefined = "";
    export { className as class };
</script>

<div
    class={cn("animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800", className)}
    {...$$restProps}
>
</div>
