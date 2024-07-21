<script lang="ts">
    import { cn } from "$utils/cn";
    import { Progress as ProgressPrimitive } from "bits-ui";

    type BaseProps = ProgressPrimitive.Props;

    // Extend the base props to include the progressBar property
    interface ProgressProps extends BaseProps {
        progressBar?: {
            barColor?: string;
            progressColor?: string;
        };
    }

    let className: ProgressProps["class"] = undefined;
    export let max: ProgressProps["max"] = 100;
    export let value: ProgressProps["value"] = undefined;
    export { className as class }

    export let progressBar: ProgressProps["progressBar"] = {
        barColor: "bg-neutral-500",
        progressColor: "bg-white"
    };
</script>

<ProgressPrimitive.Root
    class={cn("relative h-4 w-full overflow-hidden rounded-full", progressBar?.barColor ?? "bg-neutral-500", className)}
    {...$$restProps}
>
    <div
        class={cn("h-full w-full flex-1 transition-all", progressBar?.progressColor ?? "bg-white")}
        style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
    ></div>
</ProgressPrimitive.Root>
