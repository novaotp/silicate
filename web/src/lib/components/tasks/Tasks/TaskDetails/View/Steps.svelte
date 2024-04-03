<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { getContext } from 'svelte';
    import { calculateCompletion, fetchTasks, type Step } from '../utils';
    import StepComponent from './StepComponent.svelte';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { addToast } from '$lib/stores/toast';
    import { page } from '$app/stores';
    import type { PageContext } from '$lib/components/tasks/types';

    export let id: number;
    export let value: string;

    const { tasks } = getContext<PageContext>('page');
    const jwt = getContext<string>('jwt');

    $: category = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';

    let updating: boolean = false;
    let steps = JSON.parse(value) as Step[];

    let progression: string = (calculateCompletion(steps) * 100).toFixed(0);
    let pending: Step[] = steps.filter((s) => !s.completed);
    let done: Step[] = steps.filter((s) => s.completed);

    $: {
        if (updating && steps) {
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
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                steps: JSON.stringify(steps)
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

        const updatedTasks = await fetchTasks(jwt, category, search);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;
    };
</script>

<h3>Étapes</h3>
<div class="relative w-full flex flex-col p-5 rounded-lg border border-gray-300 gap-2">
    <div class="flex justify-between text-sm">
        <h3>Progression</h3>
        <span>{progression}%</span>
    </div>
    <div class="relative w-full h-1 rounded-full bg-black">
        <div class="relative h-full bg-yellow-400 duration-200 ease-in-out" style="width: {progression}%;"></div>
    </div>
</div>
<div class="relative w-full flex flex-col">
    {#each pending as step}
        <StepComponent {step} on:update={update} />
    {/each}
</div>
{#if done.length > 0}
    <h3>Terminées</h3>
    <div class="relative w-full flex flex-col">
        {#each done as step}
            <StepComponent {step} on:update={update} />
        {/each}
    </div>
{/if}
