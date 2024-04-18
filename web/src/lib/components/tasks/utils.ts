import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Step, Task } from "$libs/models/Task";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";
import { v4 } from "uuid";
import { get, type Writable } from 'svelte/store';
import { goto } from "$app/navigation";
import { page } from "$app/stores";

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

export const fetchCategories = async (jwt: string, archived: boolean): Promise<string[] | undefined> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/categories?archived=${archived}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<string[]> = await response.json();

    return result.success ? result.data : undefined;
}

type ChangeSearchParamsOptions = {
    refetchData?: boolean,
    removeOther?: boolean
}

/**
 * Changes a search param and navigates to the new url. Removes it if it's `''` or `null`.
 * @param key The key of the search param
 * @param value The new value of the search param. Set `null` or `''` to remove it.
 * @param invalidateAll Whether the data should be re-fetched or not.
 */
export const changeSearchParams = (key: string, value: string | number | null, options?: ChangeSearchParamsOptions): void => {
    if (typeof value === "number") {
        value = value.toString();
    }

    const refetchData = options?.refetchData ?? false;
    const removeOther = options?.removeOther ?? false;

    const searchParams = new URLSearchParams(get(page).url.searchParams);

    if (removeOther) {
        if (value === "" || value === null) {
            goto('/app/tasks');
            return;
        }

        goto(`/app/tasks?${key}=${encodeURI(value)}`, { invalidateAll: refetchData });
        return;
    }

    if (value === '' || value === null) {
        searchParams.delete(key);
    } else {
        searchParams.set(key, encodeURI(value));
    }

    goto(`/app/tasks?${searchParams}`, { invalidateAll: refetchData });
}
