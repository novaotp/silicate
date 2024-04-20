import type { Attachment, Task } from "$libs/models/Task";
import type { ApiResponse, ApiResponseWithData } from "$libs/types/ApiResponse";
import { toStep, type StepWithId } from "../features/tasks/utils";
import { env } from "../utils/env";
import Cookies from "js-cookie";

export async function getTasks(category: string, search: string, archived: boolean): Promise<ApiResponseWithData<Task[]>> {
    const response = await fetch(`${env.VITE_API_URL}/tasks?category=${category}&search=${search}&archived=${archived}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": Cookies.get("id")!
        }
    });
    
    return await response.json();
}

export async function getCategories(archived: boolean): Promise<ApiResponseWithData<string[]>> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/categories?archived=${archived}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": Cookies.get("id")!
        }
    });

    return await response.json();
}

/**
 * Adds a new task in the database.
 * @param jwt The `Authorization` header
 * @returns On success, returns the data, otherwise, returns a message error.
 */
export async function createTask(): Promise<ApiResponseWithData<number>> {
    const response = await fetch(`${env.VITE_API_URL}/tasks`, {
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
            authorization: Cookies.get("id")!,
            'content-type': 'application/json'
        }
    });
    
    return await response.json();
};

/**
 * Fetches a task with the given id.
 * @param id The id of the task
 * @param jwt The `Authorization` header
 * @returns The data if it succeeded, `undefined` otherwise.
 */
export async function getTask(id: number): Promise<ApiResponseWithData<Task>> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/${id}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: Cookies.get("id")!
        }
    });
    
    return await response.json();
};

export async function editTask(id: number, data: unknown): Promise<ApiResponse> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            accept: 'application/json',
            authorization: Cookies.get("id")!,
            'content-type': 'application/json'
        }
    });
    return await response.json();
}

export async function deleteTask(id: number): Promise<ApiResponse> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: Cookies.get("id")!
        }
    });
    return await response.json();
}

export async function archiveTask(id: number, archived: boolean): Promise<ApiResponse> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            archived: archived
        }),
        headers: {
            accept: 'application/json',
            authorization: Cookies.get("id")!,
            'content-type': 'application/json'
        }
    });

    return await response.json() as ApiResponse;
}

export async function createCategory(id: number, data: unknown): Promise<ApiResponse> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            accept: 'application/json',
            authorization: Cookies.get("id")!,
            'content-type': 'application/json'
        }
    });

    return await response.json();
}

export async function deleteCategory(id: number): Promise<ApiResponse> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ category: null }),
        headers: {
            accept: 'application/json',
            authorization: Cookies.get("id")!,
            'content-type': 'application/json'
        }
    });

    return await response.json();
}

export async function updateSteps(id: number, steps: StepWithId[]): Promise<ApiResponse> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            steps: steps.length > 0 ? steps.map(s => toStep(s)) : null
        }),
        headers: {
            accept: 'application/json',
            authorization: Cookies.get("id")!,
            'content-type': 'application/json'
        }
    });

    return await response.json();
}

export async function updateCategory(id: number, category: string | null): Promise<ApiResponse> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ category }),
        headers: {
            accept: 'application/json',
            authorization: Cookies.get("id")!,
            'content-type': 'application/json'
        }
    });

    return await response.json();
}

export async function getAttachment(id: number, name: string, signal: AbortSignal): Promise<Blob> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/${id}/attachment?name=${name}`, {
        method: 'GET',
        headers: {
            authorization: Cookies.get("id")!,
            'content-type': 'application/json'
        },
        signal
    });

    return await response.blob();
}

export async function createAttachment(id: number, data: FormData): Promise<ApiResponseWithData<Attachment[]>> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/${id}/attachment`, {
        method: 'POST',
        body: data,
        headers: {
            accept: 'application/json',
            authorization: Cookies.get("id")!
        }
    });

    return await response.json();
}

export async function deleteAttachment(id: number, name: string): Promise<ApiResponse> {
    const response = await fetch(`${env.VITE_API_URL}/tasks/${id}/attachment?name=${name}`, {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            authorization: Cookies.get("id")!
        }
    });

    return await response.json();
}
