import type { Memo } from "$libs/models/Memo";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";
import type { PageServerLoad } from "./$types";
import { BACKEND_URL } from "$env/static/private";

type SvelteFetch = {
    (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
}

const fetchCategories = async (fetch: SvelteFetch, jwt: string): Promise<string[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/memos/categories`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<string[]> = await response.json();

    return result.success ? result.data : undefined;
}

const fetchMemos = async (fetch: SvelteFetch, jwt: string, search: string, category: string): Promise<Memo[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/memos?search=${search}&category=${category}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Memo[]> = await response.json();

    return result.success ? result.data : undefined;
}

export const load: PageServerLoad = async ({ url, cookies, fetch }) => {
    const search = url.searchParams.get('search') ?? "";
    const category = url.searchParams.get('category') ?? "";

    return {
        memos: fetchMemos(fetch, cookies.get("id")!, search, category),
        categories: await fetchCategories(fetch, cookies.get("id")!)
    }
};

/* const DEFAULT_TITLE = "Mon mémo";

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
}; */
