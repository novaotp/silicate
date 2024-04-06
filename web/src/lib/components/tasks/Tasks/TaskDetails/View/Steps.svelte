<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { getContext } from 'svelte';
    import { calculateCompletion, fetchTasks, toStep, toStepWithId } from '../utils';
    import StepComponent from './StepComponent.svelte';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { addToast } from '$lib/stores/toast';
    import { page } from '$app/stores';
    import type { PageContext } from '$lib/components/tasks/types';
    import type { Step } from '$libs/models/Task';
    import { IconChecklist } from '@tabler/icons-svelte';
    import { v4 } from 'uuid';

    export let id: number;
    export let value: string | null;

    const { tasks } = getContext<PageContext>('page');
    const jwt = getContext<string>('jwt');

    $: category = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';
    $: archived = $page.url.searchParams.get("tab") === "archives";

    let updating: boolean = false;

    let steps = ((value ? JSON.parse(value) : []) as Step[]).map(s => toStepWithId(s));

    let progression: string = (calculateCompletion(steps) * 100).toFixed(0);
    let pending = steps.filter((s) => !s.completed);
    let done = steps.filter((s) => s.completed);

    $: {
        if (updating) {
            progression = (calculateCompletion(steps) * 100).toFixed(0);
            pending = steps.filter((s) => !s.completed);
            done = steps.filter((s) => s.completed);

            steps = [...steps];
            updating = false;
            updateSteps();
        }
    }

    const update = () => (updating = true);

    const updateSteps = async () => {
        try {
            const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    steps: steps.length > 0 ? steps.map(s => toStep(s)) : null
                }),
                headers: {
                    accept: 'application/json',
                    authorization: jwt,
                    'content-type': 'application/json'
                }
            });
            const { success, message }: ApiResponse = await response.json();

            if (!success) {
                addToast({ type: 'error', message });
                return;
            }

            const updatedTasks = await fetchTasks(jwt, category, search, archived);

            if (!updatedTasks) {
                addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
                return;
            }

            $tasks = updatedTasks;
        } catch (err) {
            console.error(`Une erreur est survenue lors de l'édition des étapes de la tâche : ${(err as Error).name}`)
        }
    };

    const addStep = () => {
        steps = [...steps, { id: v4(), label: "", completed: false }];
        update();
    }

    const deleteStep = (event: CustomEvent<string>) => {
        steps = steps.filter((s) => s.id !== event.detail);
        update();
    }
</script>

<div class="relative w-full flex flex-col justify-start gap-3">
    <div class="text-gray-500 flex justify-between">
        <div class="flex gap-4">
            <IconChecklist />
            <h3>Étapes</h3>
        </div>
        <button on:click={addStep} class="text-sm text-white px-3 py-1 bg-blue-500 rounded-lg">Ajouter</button>
    </div>
    {#if steps.length > 0}
        <div class="relative w-full flex flex-col p-5 rounded-lg border border-gray-300 gap-2">
            <div class="flex justify-between text-sm">
                <h3>Progression</h3>
                <span>{progression}%</span>
            </div>
            <div class="relative w-full h-1 rounded-full bg-black">
                <div class="relative h-full bg-yellow-400 duration-200 ease-in-out" style="width: {progression}%;"></div>
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
