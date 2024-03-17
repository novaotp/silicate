import type { ApiResponseWithData } from "$libs/types/ApiResponse";
import { fail } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Category, Priority, Status, Task } from "$libs/models/Task";

const fetchStatuses = async (): Promise<Status[]> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/statuses`);
    const { data }: ApiResponseWithData<Status[]> = await response.json();

    return data;
}

const fetchPriorities = async (): Promise<Priority[]> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/priorities`);
    const { data }: ApiResponseWithData<Priority[]> = await response.json();

    return data;
}

const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/categories`);
    const { data }: ApiResponseWithData<Category[]> = await response.json();

    return data;
}

const fetchTasks = async (search: string = "", order: string = "due-asc", category: string = "All", status: string = "All", priority: string = "All"): Promise<Task[]> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks?search=${search}&order=${order}&category=${category}&status=${status}&priority=${priority}`);
    const { data }: ApiResponseWithData<Task[]> = await response.json();

    return data;
}

export const load: PageLoad = async ({ url }) => {
    const search = url.searchParams.get("search") ?? undefined;
    const order = url.searchParams.get("order") ?? undefined;
    const category = url.searchParams.get("category") ?? undefined;
    const status = url.searchParams.get("status") ?? undefined;
    const priority = url.searchParams.get("priority") ?? undefined;

    const statuses = await fetchStatuses();

    const selectedStatuses = !status || status === 'All'
        ? [...statuses]
        : (status.split(',').map((a) => a.trim()) as Status[]);

    const priorities = await fetchPriorities();

    const selectedPriorities = !priority || priority === 'All'
        ? [...priorities]
        : (priority.split(',').map((a) => a.trim()) as Priority[]);

    try {
        return {
            tasks: fetchTasks(search, order, category, status, priority),
            statuses: await fetchStatuses(),
            priorities: await fetchPriorities(),
            categories: await fetchCategories(),
            selectedStatuses: selectedStatuses,
            selectedPriorities: selectedPriorities
        }
    } catch (err) {
        return fail(422, { dbError: true });
    }
};
