import { BACKEND_URL } from "$env/static/private";
import type { Book } from "$libs/models/Mark";
import type { ApiResponse, ApiResponseWithData } from "$libs/types/ApiResponse";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const fetchMarkBooks = async (jwt: string): Promise<Book[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/mark-books`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Book[]> = await response.json();

    return result.success ? result.data : undefined;
}

export const load: PageServerLoad = async ({ locals }) => {
    return {
        books: fetchMarkBooks(locals.jwt!)
    }
};

export const actions: Actions = {
    editBook: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            const id = data["id"];
            delete data["id"];

            if (!id) {
                throw new Error("Missing ID on book edition !")
            }

            if (!("title" in data)) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "accept": "application/json",
                    "authorization": locals.jwt!,
                    "content-type": "application/json"
                }
            });

            const result: ApiResponse = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de l'édition d'un carnet de note : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    }
};
