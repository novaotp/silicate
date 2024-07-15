import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

/**
 * Invalid route.
 */
export const load: PageServerLoad = async ({ params }) => {
    redirect(303, `/app/mark-books/${params.bookId}`);
};
