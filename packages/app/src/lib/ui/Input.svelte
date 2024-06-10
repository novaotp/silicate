<script lang="ts">
    export let name: string;
    export let value: string;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<input
    name="category"
    {value}
    maxlength="17"
    on:input
    on:click|stopPropagation
    class="relative w-full h-[50px] px-5 rounded-l bg-transparent"
/>
