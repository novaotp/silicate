import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { Memo } from "$libs/models/Memo";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";

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
        const response = await fetch(`${PUBLIC_BACKEND_URL}/memos`, {
            method: 'POST',
            body: JSON.stringify({
                title: 'Mon nouveau mémo',
                content: "",
                category: null
            }),
            headers: {
                accept: 'application/json',
                authorization: this.jwt,
                'content-type': 'application/json'
            }
        });

        return await response.json();
    };

    public async getMemo(id: string | number): Promise<ApiResponseWithData<Memo>> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/memos/${id}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "authorization": this.jwt
            }
        });

        return await response.json();
    }

    public async getMemos(category: string, search: string): Promise<ApiResponseWithData<Memo[]>> {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/memos?category=${category}&search=${search}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "authorization": this.jwt
            }
        });

        return await response.json();
    }
}
