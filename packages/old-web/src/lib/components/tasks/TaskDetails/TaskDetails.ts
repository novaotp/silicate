import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { ApiResponse } from "$libs/types/ApiResponse";

export const edit = async (id: number, jwt: string, data: unknown) => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${jwt}`,
            'content-type': 'application/json'
        }
    });
    return await response.json() as ApiResponse;
}

export const destroy = async (id: number, jwt: string) => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${jwt}`
        }
    });
    return await response.json() as ApiResponse;
}

export const archive = async (id: number, jwt: string, archived: boolean) => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            archived: archived
        }),
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${jwt}`,
            'content-type': 'application/json'
        }
    });
    return await response.json() as ApiResponse;
}
