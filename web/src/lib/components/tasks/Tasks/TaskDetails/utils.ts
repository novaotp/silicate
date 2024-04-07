import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Step, Task } from "$libs/models/Task";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";
import { v4 } from "uuid";

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
            id: v4(),
            label: step.label,
            completed: step.completed,
            subSteps: step.subSteps.map(sub => { return { id: v4(), label: sub.label, completed: sub.completed } })
        }
    } else {
        return {
            id: v4(),
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

export const fetchTasks = async (jwt: string, category: string, search: string, archived: boolean): Promise<Task[] | undefined> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks?category=${category}&search=${search}&archived=${archived}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Task[]> = await response.json();

    return result.success ? result.data : undefined;
}
