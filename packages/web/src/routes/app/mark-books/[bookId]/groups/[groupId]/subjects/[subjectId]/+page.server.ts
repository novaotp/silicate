import type { Actions, PageServerLoad } from "./$types";
import { BACKEND_URL } from "$env/static/private";
import type { Book, Exam, Group, Subject } from "$libs/models/Mark";
import type { ApiResponse, ApiResponseWithData } from "$libs/types/ApiResponse";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params }) => {
    return {
        exams: fetchExams(locals.jwt!, params.bookId, params.groupId, params.subjectId),
        subject: await fetchSubject(locals.jwt!, params.bookId, params.groupId, params.subjectId),
        groups: await fetchGroups(locals.jwt!, params.bookId),
        book: await fetchMarkBook(locals.jwt!, params.bookId)
    }
};

export const actions: Actions = {
    editSubject: async ({ locals, params, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.title) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${params.bookId}/groups/${params.groupId}/subjects/${params.subjectId}`, {
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
    destroySubject: async ({ locals, params }) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${params.bookId}/groups/${params.groupId}/subjects/${params.subjectId}`, {
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
    createExam: async ({ locals, params, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.title || !data.score || !data.weight) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${params.bookId}/groups/${params.groupId}/subjects/${params.subjectId}/exams`, {
                method: "POST",
                body: JSON.stringify({
                    title: data.title,
                    comment: data.comment,
                    score: Number(data.score),
                    weight: Number(data.weight),
                    date: data.date
                }),
                headers: {
                    "accept": "application/json",
                    "authorization": locals.jwt!,
                    "content-type": "application/json"
                }
            });

            const result: ApiResponseWithData<Exam> = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { exam: result.data, message: result.message };
        } catch (err) {
            console.error(`Une erreur est survenue lors de l'ajout d'un examen : ${(err as Error).message}`);
            return fail(500, { message: "Internal Server Error" });
        }
    },
    editExam: async ({ locals, params, request }) => {
        try {
            const formData = await request.formData();
            const data = formData.toJSON();

            if (!data.id) {
                throw new Error("Missing ID on exam edition !")
            }

            if (!data.title || !data.score || !data.weight) {
                return fail(422, { message: "Complétez tous les champs." })
            }

            const response = await fetch(
                `${BACKEND_URL}/api/v1/mark-books/${params.bookId}/groups/${params.groupId}/subjects/${params.subjectId}/exams/${data.id}`,
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

            const subject = await fetchSubject(locals.jwt!, params.bookId, params.groupId, params.subjectId);

            return { subject, message: result.message };
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
}

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

/** Retrieves all the groups related to the mark-book. */
const fetchGroups = async (jwt: string, id: string): Promise<Group[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${id}/groups`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Group[]> = await response.json();

    return result.success ? result.data : undefined;
}

const fetchSubject = async (jwt: string, bookId: string, groupId: string, subjectId: string): Promise<Subject | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${bookId}/groups/${groupId}/subjects/${subjectId}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Subject> = await response.json();

    return result.success ? result.data : undefined;
}

const fetchExams = async (jwt: string, bookId: string, groupId: string, subjectId: string): Promise<Exam[] | undefined> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/mark-books/${bookId}/groups/${groupId}/subjects/${subjectId}/exams`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Exam[]> = await response.json();

    return result.success ? result.data : undefined;
}
