import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Memo } from "$libs/models/Memo";
import type { ApiResponse, ApiResponseWithData } from "$libs/types/ApiResponse";

export class MemoRequests {
    private jwt: string;

    /**
     * A class that provides functions to request data related to tasks.
     * @param jwt The jwt token for authentication.
     */
    constructor(jwt: string) {
        this.jwt = jwt;
    }

    /**
     * Adds a new memo in the database and returns the id.
     * @returns On success, returns the id, otherwise, returns `undefined`.
     */
    public async createMemo(): Promise<ApiResponseWithData<number>> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos`, {
            method: 'POST',
            body: JSON.stringify({
                title: 'Mon nouveau mémo',
                content: "",
                category: null
            }),
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${this.jwt}`,
                'content-type': 'application/json'
            }
        });

        return await response.json();
    };

    /**
     * Updates a memo in the database.
     * @returns On success, returns the id, otherwise, returns `undefined`.
     */
    public async updateMemo(id: string | number, options: UpdateMemoOptionsProps): Promise<ApiResponse> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ ...options }),
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${this.jwt}`,
                'content-type': 'application/json'
            }
        });

        return await response.json();
    };

    /** Deletes a memo in the database. */
    public async deleteMemo(id: number): Promise<ApiResponse> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this.jwt}`
            }
        });
        return await response.json() as ApiResponse;
    }

    public async getMemo(id: string | number): Promise<ApiResponseWithData<Memo>> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/${id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "authorization": `Bearer ${this.jwt}`
            }
        });

        return await response.json();
    }

    public async getMemos(category: string, search: string): Promise<ApiResponseWithData<Memo[]>> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos?category=${category}&search=${search}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "authorization": `Bearer ${this.jwt}`
            }
        });

        return await response.json();
    }

    public async getCategories(): Promise<string[] | undefined> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/categories`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "authorization": `Bearer ${this.jwt}`
            }
        });
        const result: ApiResponseWithData<string[]> = await response.json();
    
        return result.success ? result.data : undefined;
    }
}

interface UpdateMemoOptionsProps {
    title: string,
    content: string,
    category: string | null
}
