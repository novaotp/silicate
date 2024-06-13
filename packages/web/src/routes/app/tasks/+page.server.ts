import type { ApiResponseWithData } from "$libs/types/ApiResponse";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Task } from "$libs/models/Task";
import { BACKEND_URL } from "$env/static/private";

const fetchCategories = async (jwt: string, archived: boolean): Promise<string[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/tasks/categories?archived=${archived}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
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
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Task[]> = await response.json();

    return result.success ? result.data : undefined;
}

export const load: PageServerLoad = async ({ url, cookies }) => {
    const search: string = url.searchParams.get("search") ?? "";
    const category: string = url.searchParams.get("category") ?? "";
    const archived: boolean = url.searchParams.get("tab") === "archives";

    try {
        return {
            tasks: fetchTasks(cookies.get("id")!, category, search, archived),
            categories: await fetchCategories(cookies.get("id")!, archived)
        }
    } catch (err) {
        return fail(422, { message: (err as Error).message });
    }
};
