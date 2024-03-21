<script lang="ts">
    export let label: string;
</script>

<div class="relative w-full flex justify-between items-center">
    <span>{label}</span>
    <span class="relative px-3 py-2">
        <slot />
    </span>
</div>
