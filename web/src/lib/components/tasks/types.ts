import type { Task } from '$libs/models/Task';
import { getContext } from 'svelte';
import { get, type Writable } from 'svelte/store';

export type PageContext = {
    tasks: Writable<Task[]>;
    categories: string[];
};

export const getTasks = (): Task[] => {
    const { tasks } = getContext<PageContext>("page");
    return get(tasks);
}

export const setTasks = (newTasks: Task[]): void => {
    const { tasks } = getContext<PageContext>("page");
    tasks.set(newTasks);
}

export const getCategories = (): string[] => {
    const { categories } = getContext<PageContext>("page");
    return categories;
}
