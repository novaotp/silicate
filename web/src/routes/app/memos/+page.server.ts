import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { BACKEND_URL } from "$env/static/private";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";

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
                })
            });

			const { success, data }: ApiResponseWithData<number> = await response.json();

			if (!success) {
                return fail(422, { dbError: true });
            }

			throw redirect(303, `/app/memos/${data}`);
		} catch (err) {
			return fail(422, { dbError: true });
		}
    }
};
