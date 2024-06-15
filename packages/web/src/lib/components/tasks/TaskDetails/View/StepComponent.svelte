<script lang="ts">
    import IconDotsVertical from '@tabler/icons-svelte/IconDotsVertical.svelte';
    import IconCircleXFilled from '@tabler/icons-svelte/IconCircleXFilled.svelte';
    import { createEventDispatcher } from 'svelte';
    import type { StepWithId } from '../../utils';
    import { Button } from '$lib/ui';

    export let step: StepWithId;

    const dispatch = createEventDispatcher<{ update: null, delete: string }>();
    let showStepMenu: boolean = false;

    const onCompletedStep = () => {
        if (step.subSteps) {
            const newState = step.completed;
            step.completed = newState;
            step.subSteps = step.subSteps.map((sub) => {
                return { id: sub.id, label: sub.label, completed: newState };
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
        step.subSteps = [...(step.subSteps ?? []), { id: crypto.randomUUID(), label: '', completed: false }];
        dispatch('update');
    };

    const deleteSubStep = (id: string) => {
        step.subSteps = (step.subSteps ?? []).filter(s => s.id !== id);
        dispatch('update');
    }

    const onLabelChange = () => dispatch("update");
</script>

<svelte:window on:click={() => (showStepMenu = false)}></svelte:window>

<div class="relative w-full flex flex-col">
    <button class="flex gap-2 w-full py-2 justify-between items-center">
        <div class="flex gap-2">
            <input type="checkbox" bind:checked={step.completed} on:click|stopPropagation on:change|stopPropagation={onCompletedStep} class="accent-accent-success-500" />
            <input bind:value={step.label} on:input={onLabelChange} class="text-sm w-full {step.completed ? 'line-through text-neutral-500' : ''}" />
            {#if step.subSteps && step.subSteps.length > 0}
                {@const completedSubs = step.subSteps?.reduce((acc, curr) => acc + (curr.completed ? 1 : 0), 0)}
                <span class="text-sm {step.completed ? 'line-through text-neutral-500' : ''}">{completedSubs}/{step.subSteps.length}</span>
            {/if}
        </div>
        <button class="relative" on:click|stopPropagation>
            <button on:click={() => (showStepMenu = true)}><IconDotsVertical class="size-4" /></button>
            {#if showStepMenu}
                <menu class="absolute top-[calc(100%+5px)] right-0 flex flex-col justify-center rounded-lg shadow-lg bg-white z-[1000]">
                    <Button.Normal variant="primary" on:click={newSubStep} size="small" class="rounded-b-none">
                        Ajouter
                    </Button.Normal>
                    <Button.Danger variant="tertiary" on:click={() => dispatch("delete", step.id)} size="small" class="rounded-t-none">
                        Supprimer
                    </Button.Danger>
                </menu>
            {/if}
        </button>
    </button>
    {#if step.subSteps && step.subSteps.length > 0}
        <ul class="flex flex-col ml-10 text-sm gap-2">
            {#each step.subSteps as sub}
                <li class="flex gap-2">
                    <input type="checkbox" bind:checked={sub.completed} on:change={onCompletedAllSub} class="accent-accent-success-500" />
                    <input bind:value={sub.label} on:input={onLabelChange} class="w-full {sub.completed ? 'line-through text-neutral-500' : ''}" />
                    <button on:click={() => deleteSubStep(sub.id)}><IconCircleXFilled /></button>
                </li>
            {/each}
        </ul>
    {/if}
</div>
