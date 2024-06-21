<script lang="ts">
    import { cn } from "$utils/cn";

    export let value: number;
    export let min: number = 1;
    export let max: number = 3;
    export let step: number = 0.1
</script>

<div class={cn("relative", $$restProps["class"] || "")}>
    <input type="range" {min} {max} {step} bind:value class="slider" />
</div>

<style lang="postcss">
    .slider {
        appearance: none;
        -webkit-appearance: none;
        width: 100%;
        height: 8px;
        background: #ddd;
        outline: none;
        opacity: 0.7;
        -webkit-transition: 0.2s;
        transition: opacity 0.2s;
    }

    .slider:hover {
        opacity: 1;
    }

    .slider::-webkit-slider-thumb {
        @apply bg-primary-500;
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-radius: 50%;
    }

    .slider::-moz-range-thumb {
        @apply bg-primary-500;
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-radius: 50%;
    }
</style>
