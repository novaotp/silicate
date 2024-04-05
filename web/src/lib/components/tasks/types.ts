import type { Task } from '$libs/models/Task';
import { type Writable } from 'svelte/store';

export interface PageContext {
    tasks: Writable<Task[]>;
    categories: string[];
};
