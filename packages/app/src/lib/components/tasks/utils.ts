import type { Step, Task } from "$libs/models/Task";
import { type Writable } from 'svelte/store';

export interface PageContext {
    tasks: Writable<Task[]>,
    categories: Writable<string[]>,
    viewedTaskId: Writable<number | null>
};

/** Made to deal with steps deletion, which would require a unique identifier. */
export interface StepWithId {
    id: string,
    label: string,
    completed: boolean,
    subSteps?: {
        id: string,
        label: string,
        completed: boolean
    }[]
}

export const toStepWithId = (step: Step): StepWithId => {
    if (step.subSteps) {
        return {
            id: crypto.randomUUID(),
            label: step.label,
            completed: step.completed,
            subSteps: step.subSteps.map(sub => { return { id: crypto.randomUUID(), label: sub.label, completed: sub.completed } })
        }
    } else {
        return {
            id: crypto.randomUUID(),
            label: step.label,
            completed: step.completed
        }
    }
}

export const toStep = (stepWithId: StepWithId): Step => {
    if (stepWithId.subSteps) {
        return {
            label: stepWithId.label,
            completed: stepWithId.completed,
            subSteps: stepWithId.subSteps.map(sub => { return { label: sub.label, completed: sub.completed } })
        }
    } else {
        return {
            label: stepWithId.label,
            completed: stepWithId.completed
        }
    }
}

/**
 * Calculates the progression of a task.
 * @param values The steps of the task
 * @returns A value between `0` and `1`.
 */
export const calculateCompletion = (values: Step[] | StepWithId[]): number => {
    let completedCount = 0;
    const totalCount = values.length;

    for (const value of values) {
        if (!value.completed && value.subSteps) {
            completedCount += calculateCompletion(value.subSteps);
        } else {
            completedCount += value.completed ? 1 : 0;
        }
    }

    return completedCount / totalCount;
};
