import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Book, Group, Subject } from "$libs/models/Mark";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";

/** Retrieves the mark-book with the given id. */
export const fetchMarkBook = async (jwt: string, id: string): Promise<Book | undefined> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/mark-books/${id}`, {
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
export const fetchGroupsAndSubjects = async (jwt: string, id: string): Promise<{ groups: Group[], subjects: Subject[] } | undefined> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/mark-books/${id}/groups`, {
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
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/mark-books/${bookId}/groups/${groupId}/subjects`, {
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
