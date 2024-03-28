import type { Status, Priority, Category, Task } from '$libs/models/Task';
import type { Writable } from 'svelte/store';

export type PageContext = {
    tasks: Writable<Task[]>;
    statuses: Status[];
    priorities: Priority[];
    categories: Category[];
    selected: {
        statuses: Status[];
        priorities: Priority[];
    };
};
