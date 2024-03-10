import type { Memo } from "$libs/models/Memo";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";
import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

const fetchMemos = async (search: string | null, order: string | null): Promise<Memo[]> => {
    const response = await fetch(`http://localhost:4000/memos${(() => {
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
