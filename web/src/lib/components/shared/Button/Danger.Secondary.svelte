<script lang="ts">
    export let size: 'small' | 'medium' = 'medium';

    $: textSize = size === 'small' ? 'px-3 py-1 text-sm' : 'px-5 py-2 text-md';
</script>

<button
    class="relative rounded-smd text-accent-danger-500 bg-neutral-50 border border-accent-danger-500 {textSize} {$$restProps['class'] || ''}"
    on:click
>
    <slot />
</button>
