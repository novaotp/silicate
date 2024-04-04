<script lang="ts">
    import { IconDotsVertical } from '@tabler/icons-svelte';
    import type { Step } from '../utils';
    import { createEventDispatcher } from 'svelte';

    export let step: Step;

    const dispatch = createEventDispatcher();
    let showSub: boolean = false;

    const onCompletedStep = () => {
        if (step.subSteps) {
            const newState = step.completed;
            step.completed = newState;
            step.subSteps = step.subSteps.map((sub) => {
                return { label: sub.label, completed: newState };
            });
        }

        dispatch('update');
    };

    const onCompletedAllSub = () => {
        if (step.subSteps) {
            let allChecked = true;

            for (const sub of step.subSteps) {
                if (!sub.completed) {
                    allChecked = false;
                }
            }

            step.completed = allChecked;
        }

        dispatch('update');
    };

    const newSubStep = () => {
        step.subSteps = [...(step.subSteps ?? []), { label: '', completed: false }];
        dispatch('update');
    };

    const onLabelChange = () => dispatch("update");
</script>

<div class="flex flex-col">
    <button on:click={() => (showSub = !showSub)} class="flex gap-2 w-full py-2 justify-between items-center">
        <div class="flex gap-2">
            <input type="checkbox" bind:checked={step.completed} on:click|stopPropagation on:change|stopPropagation={onCompletedStep} />
            <h3 class="text-sm {step.completed ? 'line-through text-gray-500' : ''}">{step.label}</h3>
            {#if step.subSteps && step.subSteps.length > 0}
                {@const completedSubs = step.subSteps?.reduce((acc, curr) => acc + (curr.completed ? 1 : 0), 0)}
                <span class="text-sm {step.completed ? 'line-through text-gray-500' : ''}">{completedSubs}/{step.subSteps.length}</span>
            {/if}
        </div>
        <button class="relative" on:click|stopPropagation>
            <IconDotsVertical class="size-4" />
        </button>
    </button>
    {#if step.subSteps && step.subSteps.length > 0 && showSub}
        <ul class="flex flex-col ml-10 text-sm gap-1">
            {#each step.subSteps as sub}
                <li class="flex gap-2">
                    <input type="checkbox" bind:checked={sub.completed} on:change={onCompletedAllSub} />
                    <input bind:value={sub.label} on:input={onLabelChange} class={sub.completed ? 'line-through text-gray-500' : ''} />
                </li>
            {/each}
            <li>
                <button on:click={newSubStep}>Ajouter une sous-étape</button>
            </li>
        </ul>
    {/if}
</div>
