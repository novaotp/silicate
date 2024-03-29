<script lang="ts">
    import type { Step } from './type';
    import StepComponent from './Step.svelte';

    export let steps: Step[];
</script>

<div class="relative w-full flex flex-col">
    {#each steps as step}
        <StepComponent bind:step />
    {/each}
</div>
