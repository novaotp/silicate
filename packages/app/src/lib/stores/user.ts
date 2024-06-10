import type User from "@tabler/icons-svelte/IconUser.svelte";
import { get, writable } from "svelte/store";
import type { ApiResponseWithData } from "$shared/types/ApiResponse";
import { PUBLIC_API_URL } from "$env/static/public";
import { kv } from "$lib/utils/kv";

let user = writable<User | undefined>(undefined);

export async function getUser(): Promise<User | null> {
    const response = await fetch(`${PUBLIC_API_URL}/api/v1/me`, {
        method: "GET",
        headers: {
            "authorization": (await kv.get("id"))!
        }
    });
    const result: ApiResponseWithData<User> = await response.json();

    if (!result.success) {
        return null;
    }

    user.set(result.data);
    return get(user)!;
}
