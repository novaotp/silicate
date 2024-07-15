import { BACKEND_URL } from "$env/static/private";
import type { Book, Group, Subject } from "$libs/models/Mark";
import type { ApiResponse, ApiResponseWithData } from "$libs/types/ApiResponse";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
    return {
        groupsAndSubjects: fetchGroupsAndSubjects(locals.jwt!, params.bookId),
        book: await fetchMarkBook(locals.jwt!, params.bookId)
    }
};

/** Retrieves the mark-book with the given id. */
const fetchMarkBook = async (jwt: string, id: string): Promise<Book | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${id}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Book> = await response.json();

    return result.success ? result.data : undefined;
}

/** Retrieves all the groups and subjects related to the mark-book. */
const fetchGroupsAndSubjects = async (jwt: string, id: string): Promise<{ groups: Group[], subjects: Subject[] } | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${id}/groups`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Group[]> = await response.json();

    if (!result.success) return;

    const groups: Group[] = result.data;

    const subjectsPromises = groups.map(async (group) => await fetchSubjects(jwt, id, group.id.toString()));
    const subjects = await Promise.all(subjectsPromises);

    return { groups, subjects: subjects.flat() }
}

const fetchSubjects = async (jwt: string, bookId: string, groupId: string): Promise<Subject[]> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${bookId}/groups/${groupId}/subjects`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Subject[]> = await response.json();

    if (!result.success) {
        throw new Error(result.message);
    }

    return result.data;
}

export const actions: Actions = {
    editBook: async ({ locals, params, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!("title" in data)) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${params.bookId}`, {
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
    createGroup: async ({ locals, params, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.title || !data.weight) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${params.bookId}/groups`, {
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
    createSubject: async ({ locals, params, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.groupId) {
                throw new Error("Missing group ID on subject creation !")
            }

            if (!data.title) {
                return fail(422, { message: "Le titre est obligatoire." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${params.bookId}/groups/${data.groupId}/subjects`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "accept": "application/json",
                    "authorization": locals.jwt!,
                    "content-type": "application/json"
                }
            });

            const result: ApiResponseWithData<Subject> = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { subject: result.data, message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de l'ajout d'une branche : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    }
};
