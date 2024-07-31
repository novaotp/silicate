import type { Memo } from "$common/models/memo";
import type { ApiResponseWithData } from "$common/types/api-response";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { getPreference } from "$utils/capacitor-preferences";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url }) => {
    const search = url.searchParams.get("search") ?? "";
    const category = url.searchParams.get("category") ?? "";

    return {
        memos: getMemos({ search, category }),
        categories: await getCategories(search)
    }
};

const getCategories = async (search: string) => {
    const token = await getPreference<{ jwt: string, expires: Date }>('token', { parse: true });
    
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/categories?search=${search}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    const result: ApiResponseWithData<string[]> = await response.json();

    return result.success ? result.data : undefined;
}

const getMemos = async ({ search, category }: { search: string, category: string }) => {
    const token = await getPreference<{ jwt: string, expires: Date }>('token', { parse: true });
    
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos?search=${search}&category=${category}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    const result: ApiResponseWithData<Memo[]> = await response.json();

    return result.success ? result.data : undefined;
}
