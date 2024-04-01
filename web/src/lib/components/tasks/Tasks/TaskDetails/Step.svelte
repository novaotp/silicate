<script lang="ts">
    import { IconDotsVertical } from '@tabler/icons-svelte';
    import type { Step } from './utils';

    export let step: Step;

    let showSub: boolean = false;

    const onCompletedStep = () => {
        if (step.subSteps) {
            step = {
                ...step,
                subSteps: step.subSteps.map((sub) => {
                    return { label: sub.label, completed: step.completed };
                })
            };
        }
    };

    const onCompletedAllSub = () => {
        if (step.subSteps) {
            let allChecked = true;

            for (const sub of step.subSteps) {
                if (!sub.completed) {
                    allChecked = false;
                }
            }

            step = {
                ...step,
                completed: allChecked
            };
        }
    };

    const newSubStep = () => {
        const tempSubSteps = step.subSteps ?? [];
        step = {
            ...step,
            subSteps: [...tempSubSteps, { label: '', completed: false }]
        };
    };
</script>

<div class="flex flex-col">
    <button on:click={() => (showSub = !showSub)} class="flex gap-2 w-full py-2 px-5 bg-gray-300 justify-between items-center">
        <div class="flex gap-2">
            <input type="checkbox" bind:checked={step.completed} on:click|stopPropagation on:change|stopPropagation={onCompletedStep} class="z-[999]" />
            <h3 class="text-sm">{step.label}</h3>
            {#if step.subSteps && step.subSteps.length > 0}
                {@const completedSubs = step.subSteps?.reduce((acc, curr) => acc + (curr.completed ? 1 : 0), 0)}
                <span class="text-sm">{completedSubs}/{step.subSteps.length}</span>
            {/if}
        </div>
        <button class="relative" on:click|stopPropagation>
            <IconDotsVertical class="size-4" />
        </button>
    </button>
    {#if step.subSteps && step.subSteps.length > 0 && showSub}
        <ul class="flex flex-col ml-10 text-sm gap-1">
            {#each step.subSteps as sub}
                <li>
                    <input type="checkbox" bind:checked={sub.completed} on:change={onCompletedAllSub} />
                    <input bind:value={sub.label} />
                </li>
            {/each}
            <li>
                <button on:click={newSubStep}>Ajouter une sous-étape</button>
            </li>
        </ul>
    {/if}
</div>
