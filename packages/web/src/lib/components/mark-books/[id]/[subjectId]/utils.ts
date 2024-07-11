import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Subject, Exam } from "$libs/models/Mark";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";

export const fetchSubject = async (jwt: string, bookId: string, groupId: string, subjectId: string): Promise<Subject | undefined> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/mark-books/${bookId}/groups/${groupId}/subjects/${subjectId}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Subject> = await response.json();

    return result.success ? result.data : undefined;
}

export const fetchExams = async (jwt: string, bookId: string, groupId: string, subjectId: string): Promise<Exam[] | undefined> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/mark-books/${bookId}/groups/${groupId}/subjects/${subjectId}/exams`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": jwt
        }
    });
    const result: ApiResponseWithData<Exam[]> = await response.json();

    return result.success ? result.data : undefined;
}
