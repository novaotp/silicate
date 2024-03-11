import type { Memo } from "$libs/models/Memo";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";
import { redirect, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { BACKEND_URL } from "$env/static/private";

const fetchMemos = async (search: string | null, order: string | null): Promise<Memo[]> => {
    const response = await fetch(`${BACKEND_URL}/memos${(() => {
        if (!order || order === "") {
            order = "date-desc";
        }

        if (!search || search === "") {
            return `?order=${order}`;
        }

        return `?search=${search}&order=${order}`;
    })()}`);
    const { data }: ApiResponseWithData<Memo[]> = await response.json();

    return data
            .filter((memo) => search === null || memo.title
            .toLowerCase()
            .includes(search.toLowerCase()));
}

export const load: PageServerLoad = async ({ url }) => {
    const search = url.searchParams.get('search');
    const order = url.searchParams.get('order');

    if (search === "") {
        const redirectUrl = order === "" || order === null ? `/app/memos` : `/app/memos?order=${order}`;
        throw redirect(303, redirectUrl);
    }

    if (order === "date-desc" || order === "") {
        const redirectUrl = search === "" || search === null ? `/app/memos` : `/app/memos?search=${search}`;
        throw redirect(303, redirectUrl);
    }

    try {
        return {
            search: search,
            order: order,
            memos: fetchMemos(search, order)
        }
    } catch (err) {
        return fail(422, { memos: [] as Memo[], dbError: true });
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
