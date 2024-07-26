import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Memo } from "$common/models/memo";
import type { ApiResponse, ApiResponseWithData } from "$common/types/api-response";

export const fetchCategories = async (jwt: string, search: string): Promise<ApiResponseWithData<string[]>> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/categories?search=${search}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${jwt}`
        }
    });
    return await response.json();
}

export const fetchMemos = async (jwt: string, search: string, category: string): Promise<ApiResponseWithData<Memo[]>> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos?search=${search}&category=${category}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${jwt}`
        }
    });

    return await response.json();
}

export const fetchMemo = async (jwt: string, id: string): Promise<ApiResponseWithData<Memo>> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/${id}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${jwt}`
        }
    });

    return await response.json();
};

export const createMemo = async (jwt: string): Promise<ApiResponseWithData<number>> => {
    const defaultMemo: Partial<Memo> = {
        title: 'Mon nouveau mémo',
        content: "",
        category: null,
        pinned: false
    };

    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos`, {
        method: 'POST',
        body: JSON.stringify(defaultMemo),
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${jwt}`,
            'content-type': 'application/json'
        }
    });

    return await response.json();
}

export const updateMemo = async (jwt: string, id: number, data: Omit<Memo, "id" | "lastChange">): Promise<ApiResponse> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${jwt}`,
            'content-type': 'application/json'
        }
    });
    
    return await response.json();
}

export const patchMemo = async (jwt: string, id: number, data: Partial<Omit<Memo, "id" | "lastChange">>): Promise<ApiResponse> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${jwt}`,
            'content-type': 'application/json'
        }
    });
    
    return await response.json();
}

export const deleteMemo = async (jwt: string, id: number): Promise<ApiResponse> => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/${id}`, {
        method: 'DELETE',
        headers: {
            "accept": 'application/json',
            authorization: jwt
        }
    });
    
    return await response.json();
}
