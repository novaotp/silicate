import type { Memo } from "$libs/models/Memo";
import type { ApiResponse, ApiResponseWithData } from "$libs/types/ApiResponse";
import type { Actions, PageServerLoad } from "./$types";
import { BACKEND_URL } from "$env/static/private";
import { fail } from "@sveltejs/kit";

const fetchCategories = async (jwt: string): Promise<string[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/memos/categories`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${jwt}`
        }
    });
    const result: ApiResponseWithData<string[]> = await response.json();

    return result.success ? result.data : undefined;
}

const fetchMemos = async (jwt: string, search: string, category: string): Promise<Memo[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/memos?search=${search}&category=${category}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${jwt}`
        }
    });
    const result: ApiResponseWithData<Memo[]> = await response.json();

    return result.success ? result.data : undefined;
}

export const load: PageServerLoad = async ({ url, cookies }) => {
    const search = url.searchParams.get('search') ?? "";
    const category = url.searchParams.get('category') ?? "";
    const jwt = cookies.get("id")!;

    return {
        memos: fetchMemos(jwt, search, category),
        categories: await fetchCategories(jwt)
    }
};

export const actions: Actions = {
    create: async ({ cookies, url }) => {
        try {
            const jwt = cookies.get("id")!;
            const search = url.searchParams.get('search') ?? "";
            const category = url.searchParams.get('category') ?? "";

            const response = await fetch(`${BACKEND_URL}/api/v1/memos`, {
                method: 'POST',
                body: JSON.stringify({
                    title: 'Mon nouveau mémo',
                    content: "",
                    category: null,
                    pinned: false
                }),
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${jwt}`,
                    'content-type': 'application/json'
                }
            });
    
            const result: ApiResponseWithData<number> = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            const memos = await fetchMemos(jwt, decodeURIComponent(search), decodeURIComponent(category));

            if (!memos) {
                return { id: result.data };
            } else {
                return { id: result.data, memos: memos };
            }
        } catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
		}
    },
    edit: async ({ cookies, request, url }) => {
        try {
            const jwt = cookies.get("id")!;
            const search = url.searchParams.get('search') ?? "";
            const category = url.searchParams.get('category') ?? "";

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
                    authorization: `Bearer ${jwt}`,
                    'content-type': 'application/json'
                }
            });
    
            const result: ApiResponse = await response.json();

			if (!result.success) {
                return fail(422, { message: result.message });
            }

            const memos = await fetchMemos(jwt, decodeURIComponent(search), decodeURIComponent(category));
            const categories = await fetchCategories(jwt);

            if (memos && categories) {
                return { memos, categories };
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
            const response = await fetch(`${BACKEND_URL}/api/v1/memos/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: cookies.get("id")!
                }
            });
            const result: ApiResponse = await response.json();

			if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: "Mémo supprimé avec succès." }
		} catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
		}
    }
};
