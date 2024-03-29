<script lang="ts">
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { Task } from '$libs/models/Task';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { IconAlignLeft, IconCalendarClock, IconChevronLeft, IconEdit, IconTrashX, IconX } from '@tabler/icons-svelte';
    import { createEventDispatcher, getContext } from 'svelte';
    import { addToast } from '$lib/stores/toast';
    import FullScreen from '../shared/FullScreen.svelte';
    import * as Header from '../shared/Header';
    import Main from '../shared/Main.svelte';
    import type { Step } from './type';
    import Steps from './Steps.svelte';
    import type { PageContext } from '../../types';

    const { tasks } = getContext<PageContext>('page');
    /** The id of the task to show. */
    export let id: number | null;
    /** The state of the modal. */
    export let show: boolean;

    $: task = $tasks.find((t) => t.id === id);

    $: {
        if (show) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }

    const dispatch = createEventDispatcher();

    const edit = () => dispatch('edit');
    const destroy = async () => {
        if (!task) return;

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${task.id}`, { method: 'DELETE' });
        const { success, message }: ApiResponse = await response.json();

        if (!success) {
            addToast({ type: 'error', message });
            return;
        }

        $tasks = $tasks.filter((t) => t.id !== task?.id);
        show = false;
    };

    /** Dummy steps. */
    let values: Step[] = [
        {
            label: 'Apprendre les actions Svelte',
            completed: true
        },
        {
            label: 'Revoir les solutions du prof',
            completed: false,
            subSteps: [
                {
                    label: 'Solution PR320',
                    completed: true
                },
                {
                    label: 'Solution PR350',
                    completed: false
                }
            ]
        },
        {
            label: 'Prier pour que ça passe',
            completed: false,
            subSteps: [
                {
                    label: 'Avoir la foi',
                    completed: false
                },
                {
                    label: 'Croire en dieu',
                    completed: false
                },
                {
                    label: 'Aller dans un lieu saint',
                    completed: false
                }
            ]
        },
        {
            label: 'Dormir',
            completed: true
        }
    ];

    const calculateCompletion = (values: Array<any>): number => {
        let completedCount = 0;
        const totalCount = values.length;

        for (const value of values) {
            if (value.subSteps) {
                completedCount += calculateCompletion(value.subSteps);
            } else {
                completedCount += value.completed ? 1 : 0;
            }
        }

        return completedCount / totalCount;
    };

    $: progression = (calculateCompletion(values) * 100).toFixed(0);
</script>

{#if show && task}
    <FullScreen>
        <Header.Root>
            <Header.Button on:click={() => (show = false)}>
                <IconChevronLeft class="text-white" />
            </Header.Button>
            <Header.Group>
                <Header.Button class="text-red-500 p-2" on:click={destroy}><IconTrashX /></Header.Button>
                <Header.Button class="bg-blue-600 text-white px-4 py-2" on:click={edit}><IconEdit /></Header.Button>
            </Header.Group>
        </Header.Root>
        <Main class="px-0">
            <div class="relative px-5 pt-20 pb-5 w-full flex flex-col gap-5 custom-bg text-white">
                <h2 class="relative w-full flex justify-between items-center text-xl font-medium">{task.title}</h2>
                {#if task.description}
                    <p class="relative w-full text-sm text-justify rounded-lg">{task.description}</p>
                {/if}
                <div class="relative w-full flex flex-col p-5 rounded-lg border border-gray-300 gap-2">
                    <div class="flex justify-between text-sm">
                        <h3>Progression</h3>
                        <span>{progression}%</span>
                    </div>
                    <div class="relative w-full h-1 rounded-full bg-black">
                        <div class="relative h-full bg-yellow-400 duration-200 ease-in-out" style="width: {progression}%;"></div>
                    </div>
                </div>
            </div>
            {#if task.due}
                {@const date = new Date(task.due).toLocaleDateString('fr-CH', { day: '2-digit', month: 'long', year: 'numeric' })}
                {@const time = new Date(task.due).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' }).split(':').join('h')}
                <time class="flex gap-5 items-center bg-red-500 text-white rounded-full">
                    <IconCalendarClock class="size-6" />
                    <span>{date}, {time}</span>
                </time>
            {/if}
            <Steps bind:steps={values} />
        </Main>
    </FullScreen>
{/if}

<style>
    .custom-bg {
        background: rgb(51, 79, 89);
        background: linear-gradient(45deg, rgba(51, 79, 89, 1) 0%, rgba(33, 67, 75, 1) 50%, rgba(17, 43, 48, 1) 100%);
    }
</style>
