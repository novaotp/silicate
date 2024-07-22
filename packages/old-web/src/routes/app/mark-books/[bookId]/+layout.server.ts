import { BACKEND_URL } from "$env/static/private";
import type { Book } from "$libs/models/Mark";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const books = await fetchMarkBooks(locals.jwt!);

    return { books: books! };
};

/** Retrieves all the mark-books. */
const fetchMarkBooks = async (jwt: string): Promise<Book[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/mark-books`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${jwt}`
        }
    });
    const result: ApiResponseWithData<Book[]> = await response.json();

    return result.success ? result.data : undefined;
}
