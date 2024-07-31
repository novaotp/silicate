import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { getJWTFromCookies } from "$utils/jwt";
import type { PageLoad } from "./$types";
import type { ApiResponseWithData } from "$common/types/api-response";
import type { Memo } from "$common/models/memo";

export const load: PageLoad = async ({ url }) => {
    const search = url.searchParams.get("search") ?? "";
    const category = url.searchParams.get("category") ?? "";

    return {
        memos: getMemos({ search, category }),
        categories: await getCategories(search)
    }
};

const getCategories = async (search: string) => {
    const token = getJWTFromCookies();
    
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/categories?search=${search}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    const result: ApiResponseWithData<string[]> = await response.json();
    console.log(result)

    return result.success ? result.data : undefined;
}

const getMemos = async ({ search, category }: { search: string, category: string }) => {
    const token = getJWTFromCookies();
    
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
