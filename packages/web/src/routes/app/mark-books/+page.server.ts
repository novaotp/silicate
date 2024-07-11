import { BACKEND_URL } from "$env/static/private";
import type { Book, Group } from "$libs/models/Mark";
import type { ApiResponse, ApiResponseWithData } from "$libs/types/ApiResponse";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { SvelteKitFetch } from "$types/sveltekit-fetch";

const fetchMarkBooks = async (jwt: string, fetch: SvelteKitFetch): Promise<Book[] | undefined> => {
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

export const load: PageServerLoad = async ({ locals, fetch }) => {
    return {
        books: fetchMarkBooks(locals.jwt!, fetch)
    }
};

export const actions: Actions = {
    createBook: async ({ locals, request, fetch }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.title || !data.gradingSystem) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "accept": "application/json",
                    "authorization": locals.jwt!,
                    "content-type": "application/json"
                }
            });

            const result: ApiResponseWithData<number> = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            const books = await fetchMarkBooks(locals.jwt!, fetch);

            return { id: result.data, books, message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de l'ajout d'un carnet de note : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    },
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
    },
    destroyBook: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.id) {
                throw new Error("Missing ID on book deletion !")
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${data.id}`, {
                method: "DELETE",
                headers: {
                    "accept": "application/json",
                    "authorization": locals.jwt!
                }
            });

            const result: ApiResponse = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de la suppression d'un carnet de note : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    },
    createGroup: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.bookId) {
                throw new Error("Missing book ID on group creation !")
            }

            if (!data.title || !data.weight) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${data.bookId}/groups`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "accept": "application/json",
                    "authorization": locals.jwt!,
                    "content-type": "application/json"
                }
            });

            const result: ApiResponseWithData<Group> = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { group: result.data, message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de l'ajout d'un groupe : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    },
    editGroup: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.bookId) {
                throw new Error("Missing book ID on group edition !")
            }

            if (!data.id) {
                throw new Error("Missing group ID on group edition !")
            }

            if (!data.title || !data.weight) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${data.bookId}/groups/${data.id}`, {
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
            console.error(`Une erreur est survenue lors de l'édition d'un groupe : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    },
    destroyGroup: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.bookId) {
                throw new Error("Missing book ID on group deletion !")
            }

            if (!data.id) {
                throw new Error("Missing group ID on group deletion !")
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${data.bookId}/groups/${data.id}`, {
                method: "DELETE",
                headers: {
                    "accept": "application/json",
                    "authorization": locals.jwt!
                }
            });

            const result: ApiResponse = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de la suppression d'un groupe : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    },
    createSubject: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.groupId) {
                throw new Error("Missing group ID on subject creation !")
            }

            if (!data.bookId) {
                throw new Error("Missing book ID on subject creation !")
            }

            if (!data.title) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${data.bookId}/groups/${data.groupId}/subjects`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "accept": "application/json",
                    "authorization": locals.jwt!,
                    "content-type": "application/json"
                }
            });

            const result: ApiResponseWithData<number> = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { id: result.data, message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de l'ajout d'une branche : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    },
    editSubject: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.groupId) {
                throw new Error("Missing group ID on subject edition !")
            }

            if (!data.bookId) {
                throw new Error("Missing book ID on subject edition !")
            }

            if (!data.id) {
                throw new Error("Missing ID on subject edition !")
            }

            if (!data.title) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${data.bookId}/groups/${data.groupId}/subjects/${data.id}`, {
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
            console.error(`Une erreur est survenue lors de l'édition d'une branche : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    },
    destroySubject: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.groupId) {
                throw new Error("Missing group ID on subject deletion !")
            }

            if (!data.bookId) {
                throw new Error("Missing book ID on subject deletion !")
            }

            if (!data.id) {
                throw new Error("Missing ID on subject deletion !")
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${data.bookId}/groups/${data.groupId}/subjects/${data.id}`, {
                method: "DELETE",
                headers: {
                    "accept": "application/json",
                    "authorization": locals.jwt!
                }
            });

            const result: ApiResponse = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de la suppression d'une branche : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    },
    createExam: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.subjectId) {
                throw new Error("Missing subject ID on exam creation !")
            }

            if (!data.groupId) {
                throw new Error("Missing group ID on exam creation !")
            }

            if (!data.bookId) {
                throw new Error("Missing book ID on exam creation !")
            }

            if (!data.title || !data.score || !data.weight) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${data.bookId}/groups/${data.groupId}/subjects/${data.subjectId}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "accept": "application/json",
                    "authorization": locals.jwt!,
                    "content-type": "application/json"
                }
            });

            const result: ApiResponseWithData<number> = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { id: result.data, message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de l'ajout d'un examen : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    },
    editExam: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();           

            if (!data.subjectId) {
                throw new Error("Missing subject ID on exam edition !")
            }

            if (!data.groupId) {
                throw new Error("Missing group ID on exam edition !")
            }

            if (!data.bookId) {
                throw new Error("Missing book ID on exam edition !")
            }

            if (!data.id) {
                throw new Error("Missing ID on exam edition !")
            }

            if (!data.title || !data.score || !data.weight) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(
                `${BACKEND_URL}/api/v1/mark-books/${data.bookId}/groups/${data.groupId}/subjects/${data.subjectId}/exams/${data.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: {
                        "accept": "application/json",
                        "authorization": locals.jwt!,
                        "content-type": "application/json"
                    }
                }
            );

            const result: ApiResponse = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de l'édition d'un examen : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    },
    destroyExam: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.subjectId) {
                throw new Error("Missing subject ID on exam deletion !")
            }

            if (!data.groupId) {
                throw new Error("Missing group ID on exam deletion !")
            }

            if (!data.bookId) {
                throw new Error("Missing book ID on exam deletion !")
            }

            if (!data.id) {
                throw new Error("Missing ID on exam deletion !")
            }

            const response = await fetch(
                `${BACKEND_URL}/api/v1/mark-books/${data.bookId}/groups/${data.groupId}/subjects/${data.subjectId}/exams/${data.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "accept": "application/json",
                        "authorization": locals.jwt!
                    }
                }
            );

            const result: ApiResponse = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de la suppression d'un examen : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    }
};
