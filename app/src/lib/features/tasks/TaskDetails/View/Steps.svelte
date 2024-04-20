<script lang="ts">
    import { getContext } from 'svelte';
    import StepComponent from './StepComponent.svelte';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { addToast } from '$lib/stores/toast';
    import type { Step } from '$libs/models/Task';
    import { IconChecklist } from '@tabler/icons-svelte';
    import { calculateCompletion, toStepWithId, type PageContext } from '../../utils';
    import { Button } from '$lib/ui';
    import { querystring } from "svelte-spa-router";
    import { getTasks, updateSteps } from '$/lib/requests/tasks';

    export let id: number;
    export let value: string | null;

    const { tasks } = getContext<PageContext>('page');

    $: urlSearchParams = new URLSearchParams($querystring);
    $: category = urlSearchParams.get('category') ?? '';
    $: search = urlSearchParams.get('search') ?? '';
    $: archived = urlSearchParams.get("tab") === "archives";

    let timer: NodeJS.Timeout;
    let updating: boolean = false;

    let steps = ((value ? JSON.parse(value) : []) as Step[]).map(s => toStepWithId(s));

    let progression: string = (calculateCompletion(steps) * 100).toFixed(0);
    let pending = steps.filter((s) => !s.completed);
    let done = steps.filter((s) => s.completed);

    $: {
        if (updating) {
            clearTimeout(timer);
            progression = (calculateCompletion(steps) * 100).toFixed(0);
            pending = steps.filter((s) => !s.completed);
            done = steps.filter((s) => s.completed);

            steps = [...steps];
            updating = false;
            timer = setTimeout(async () => {
                await updateStep();
            }, 750);
        }
    }

    const update = () => (updating = true);

    const updateStep = async () => {
        try {
            const { success, message }: ApiResponse = await updateSteps(id, steps);

            if (!success) {
                addToast({ type: 'error', message });
                return;
            }

            const updatedTaskResults = await getTasks(category, search, archived);

            if (!updatedTaskResults.success) {
                addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
                return;
            }

            $tasks = updatedTaskResults.data;
        } catch (err) {
            console.error(`Une erreur est survenue lors de l'édition des étapes de la tâche : ${(err as Error).name}`)
        }
    };

    const addStep = () => {
        steps = [...steps, { id: crypto.randomUUID(), label: "", completed: false }];
        update();
    }

    const deleteStep = (event: CustomEvent<string>) => {
        steps = steps.filter((s) => s.id !== event.detail);
        update();
    }
</script>

<div class="relative w-full flex flex-col justify-start gap-3 text-neutral-950">
    <div class="text-neutral-500 flex justify-between">
        <div class="flex gap-4">
            <IconChecklist />
            <h3>Étapes</h3>
        </div>
        <Button.Normal variant="primary" on:click={addStep} size="small">
            Ajouter
        </Button.Normal>
    </div>
    {#if steps.length > 0}
        <div class="relative w-full flex flex-col p-5 rounded-lg bg-neutral-100 gap-2">
            <div class="flex justify-between text-sm text-neutral-950">
                <h3>Progression</h3>
                <span>{progression}%</span>
            </div>
            <div class="relative w-full h-1 rounded-full bg-neutral-950">
                <div class="relative h-full bg-accent-success-500 duration-200 ease-in-out" style="width: {progression}%;"></div>
            </div>
        </div>
    {/if}
    <div class="relative w-full flex flex-col items-start gap-2">
        {#each pending as step}
            <StepComponent {step} on:update={update} on:delete={deleteStep} />
        {/each}
        {#if done.length > 0}
            {#each done as step}
                <StepComponent {step} on:update={update} on:delete={deleteStep} />
            {/each}
        {/if}
    </div>
</div>
