import type { ApiResponseWithData } from "$libs/types/ApiResponse";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { BACKEND_URL } from "$env/static/private";
import type { Priority, Status, Task } from "$libs/models/Task";

const fetchStatuses = async (): Promise<Status[]> => {
    const response = await fetch(`${BACKEND_URL}/tasks/statuses`);
    const { data }: ApiResponseWithData<Status[]> = await response.json();

    return data;
}

const fetchPriorities = async (): Promise<Priority[]> => {
    const response = await fetch(`${BACKEND_URL}/tasks/priorities`);
    const { data }: ApiResponseWithData<Priority[]> = await response.json();

    return data;
}

const fetchTasks = async (search: string = "", order: string = "due-asc", category: string = "All", status: string = "All"): Promise<Task[]> => {
    const response = await fetch(`${BACKEND_URL}/tasks?search=${search}&order=${order}&category=${category}&status=${status}`);
    const { data }: ApiResponseWithData<Task[]> = await response.json();

    return data;
}

export const load: PageServerLoad = async ({ url }) => {
    const search = url.searchParams.get("search") ?? undefined;
    const order = url.searchParams.get("order") ?? undefined;
    const category = url.searchParams.get("category") ?? undefined;
    const status = url.searchParams.get("status") ?? undefined;

    try {
        return {
            tasks: fetchTasks(search, order, category, status),
            statuses: await fetchStatuses(),
            priorities: await fetchPriorities()
        }
    } catch (err) {
        return fail(422, { dbError: true });
    }
};

const DEFAULT_TITLE = "Mon mémo";

export const actions: Actions = {
    default: async ({ locals }) => {
        try {
            const response = await fetch(`${BACKEND_URL}/memos`, {
                method: "POST",
                body: JSON.stringify({
                    userId: locals.user!.id,
                    tag: null,
                    title: DEFAULT_TITLE,
                    content: ""
                }),
                headers: {
                    'content-type': "application/json"
                }
            });

			const { success, data }: ApiResponseWithData<number> = await response.json();

			if (!success) {
                return fail(422, { dbError: true });
            }

			return { id: data };
		} catch (err) {
			return fail(422, { dbError: true });
		}
    }
};
