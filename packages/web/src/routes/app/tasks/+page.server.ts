import type { ApiResponse, ApiResponseWithData } from "$libs/types/ApiResponse";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { Reminder, Task } from "$libs/models/Task";
import { BACKEND_URL } from "$env/static/private";

const fetchCategories = async (jwt: string, search: string, archived: boolean): Promise<string[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/tasks/categories?search=${search}&archived=${archived}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${jwt}`
        }
    });
    const result: ApiResponseWithData<string[]> = await response.json();

    return result.success ? result.data : undefined;
}

const fetchTasks = async (jwt: string, category: string, search: string, archived: boolean): Promise<Task[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/tasks?category=${category}&search=${search}&archived=${archived}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${jwt}`
        }
    });
    const result: ApiResponseWithData<Task[]> = await response.json();

    return result.success ? result.data : undefined;
}

export const load: PageServerLoad = async ({ url, locals }) => {
    const search: string = url.searchParams.get("search") ?? "";
    const category: string = url.searchParams.get("category") ?? "";
    const archived: boolean = url.searchParams.get("tab") === "archives";

    try {
        return {
            /** The tasks for the current view. */
            tasks: fetchTasks(locals.jwt!, category, search, archived),
            /**
             * The tasks for the other view.
             * 
             * Needed for some conditional aspects.
             * 
             * @description Also, I didn't find a better name...
             * @todo Find a better name
             */
            otherTasks: fetchTasks(locals.jwt!, category, search, !archived),
            categories: await fetchCategories(locals.jwt!, search, archived)
        }
    } catch (err) {
        return fail(422, { message: (err as Error).message });
    }
};

export const actions: Actions = {
    create: async ({ locals, url }) => {
        try {
            const search = url.searchParams.get('search') ?? "";
            const category = url.searchParams.get('category') ?? "";
            const archived = url.searchParams.get('archived') === "true";

            const response = await fetch(`${BACKEND_URL}/api/v1/tasks`, {
                method: 'POST',
                body: JSON.stringify({
                    title: 'Ma nouvelle tâche',
                    description: null,
                    category: null,
                    due: new Date(),
                    steps: null,
                    attachments: null,
                    archived: false
                }),
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${locals.jwt}`,
                    'content-type': 'application/json'
                }
            });
    
            const result: ApiResponseWithData<number> = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            const tasks = await fetchTasks(locals.jwt!, decodeURIComponent(search), decodeURIComponent(category), archived);

            return { id: result.data, message: "Tâche créée avec succès.", tasks };
        } catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
        }
    },
    edit: async ({ locals, request, url }) => {
        try {
            const search = url.searchParams.get('search') ?? "";
            const category = url.searchParams.get('category') ?? "";
            const archived = url.searchParams.get('archived') === "true";

            const formData = await request.formData();
            const id = formData.get("id")!.toString();
            const data = {
                title: formData.get("title")?.toString(),
                content: formData.get("content")?.toString(),
                category: formData.get("category")?.toString(),
                pinned: formData.get("pinned")?.toString()
            }

            if (!data.title || data.title === "") {
                return fail(422, { message: "Titre obligatoire." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/memos/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${locals.jwt}`,
                    'content-type': 'application/json'
                }
            });
    
            const result: ApiResponse = await response.json();

			if (!result.success) {
                return fail(422, { message: result.message });
            }

            const tasks = await fetchTasks(locals.jwt!, decodeURIComponent(search), decodeURIComponent(category), archived);
            const categories = await fetchCategories(locals.jwt!, decodeURIComponent(search), archived);

            if (tasks && categories) {
                return { tasks, categories };
            }
		} catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
		}
    },
    destroy: async ({ cookies, request }) => {
        try {
            const formData = await request.formData();
            const id = formData.get("id")!.toString();
            const response = await fetch(`${BACKEND_URL}/api/v1/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: cookies.get("id")!
                }
            });
            const result: ApiResponse = await response.json();

			if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: "Tâche supprimée avec succès." }
		} catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
		}
    },
    archiveTask: async ({ locals, request, url }) => {
        try {
            const search = url.searchParams.get('search') ?? "";
            const category = url.searchParams.get('category') ?? "";
            const archived = url.searchParams.get('archived') === "true";

            const formData = await request.formData();
            const taskId = formData.get("taskId")!.toString();
            const taskArchived = formData.get("archived")!.toString() === "true";

            const response = await fetch(`${BACKEND_URL}/api/v1/tasks/${taskId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    archived: taskArchived
                }),
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${locals.jwt}`,
                    'content-type': 'application/json'
                }
            });
            const result: ApiResponse = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            const tasks = await fetchTasks(locals.jwt!, decodeURIComponent(search), decodeURIComponent(category), archived);

            return { message: "Tâche archivée avec succès.", tasks };
        } catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
        }
    },
    createReminder: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const taskId = formData.get("taskId")!.toString();

            const response = await fetch(`${BACKEND_URL}/api/v1/tasks/${taskId}/reminders`, {
                method: 'POST',
                body: JSON.stringify({ time: new Date() }),
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${locals.jwt}`,
                    'content-type': 'application/json'
                }
            });
    
            const result: ApiResponseWithData<Reminder> = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { reminder: result.data };
        } catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
        }
    },
    editReminder: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const taskId = formData.get("taskId")!.toString();
            const reminderId = formData.get("reminderId")!.toString();
            const time = formData.get("time")!.toString();

            if (!time) {
                return fail(422, { message: "Impossible d'avoir un rappel pour une date nulle." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/tasks/${taskId}/reminders/${reminderId}`, {
                method: 'PUT',
                body: JSON.stringify({ time }),
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${locals.jwt}`,
                    'content-type': 'application/json'
                }
            });
            const result: ApiResponse = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: "Rappel modifié avec succès." };
        } catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
        }
    },
    destroyReminder: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const taskId = formData.get("taskId")!.toString();
            const reminderId = formData.get("reminderId")!.toString();

            const response = await fetch(`${BACKEND_URL}/api/v1/tasks/${taskId}/reminders/${reminderId}`, {
                method: 'DELETE',
                body: JSON.stringify({ time: new Date() }),
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${locals.jwt}`,
                    'content-type': 'application/json'
                }
            });
    
            const result: ApiResponseWithData<Reminder> = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: "Rappel supprimé avec succès." };
        } catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
        }
    }
};
