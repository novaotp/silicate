import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Task } from "$libs/models/Task";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";

/**
 * Adds a new task in the database.
 * @param jwt The `Authorization` header
 * @returns On success, returns the data, otherwise, returns a message error.
 */
export const addTask = async (jwt: string): Promise<{ message: string | undefined, data: number | undefined }> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks`, {
        method: 'POST',
        body: JSON.stringify({
            title: 'Ma nouvelle tâche',
            description: null,
            category: null,
            due: new Date(),
            steps: null,
            attachments: null,
            archived: false
        }),
        headers: {
            accept: 'application/json',
            authorization: jwt,
            'content-type': 'application/json'
        }
    });
    const result: ApiResponseWithData<number> = await response.json();

    return result.success ? { message: undefined, data: result.data } : { message: result.message, data: undefined };
};

/**
 * Fetches a task with the given id.
 * @param id The id of the task
 * @param jwt The `Authorization` header
 * @returns The data if it succeeded, `undefined` otherwise.
 */
export const fetchTask = async (id: number, jwt: string) => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: jwt
        }
    });
    const result: ApiResponseWithData<Task> = await response.json();

    return result.success ? result.data : undefined;
};
