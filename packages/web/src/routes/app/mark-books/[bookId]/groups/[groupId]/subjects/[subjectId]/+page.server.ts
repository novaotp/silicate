import type { PageServerLoad } from "./$types";
import { BACKEND_URL } from "$env/static/private";
import type { Exam, Subject } from "$libs/models/Mark";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";

export const load: PageServerLoad = async ({ locals, params }) => {
    return {
        exams: fetchExams(locals.jwt!, params.bookId, params.groupId, params.subjectId),
        subject: await fetchSubject(locals.jwt!, params.bookId, params.groupId, params.subjectId)
    }
};

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
