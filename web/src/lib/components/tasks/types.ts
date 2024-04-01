import type { Task } from '$libs/models/Task';
import { getContext } from 'svelte';
import { type Writable } from 'svelte/store';

export type PageContext = {
    tasks: Writable<Task[]>;
    categories: string[];
};

export const getCategories = (): string[] => {
    const { categories } = getContext<PageContext>("page");
    return categories;
}
