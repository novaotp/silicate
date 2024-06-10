import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { BACKEND_URL } from "$env/static/private";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";
import type { Memo } from "$libs/models/Memo";

export const load: PageServerLoad = async ({ params }) => {
    try {
        const response = await fetch(`${BACKEND_URL}/memos/${params.id}`);
        const { data }: ApiResponseWithData<Memo> = await response.json();

        return {
            memo: data
        }
    } catch (err) {
        return fail(422, { dbError: true });
    }
};
