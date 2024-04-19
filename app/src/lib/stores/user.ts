import { env } from "$/utils/env";
import type User from "@tabler/icons-svelte/IconUser.svelte";
import { get, writable } from "svelte/store";
import Cookies from "js-cookie";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";

let user = writable<User | undefined>(undefined);

export async function getUser(): Promise<User | null> {
    if (get(user)) {
        return get(user)!;
    }

    const response = await fetch(`${env.VITE_API_URL}/me`, {
        method: "GET",
        headers: {
            "authorization": Cookies.get("id")!
        }
    });
    const result: ApiResponseWithData<User> = await response.json();

    if (!result.success) {
        return null;
    }

    user.set(result.data);
    return get(user)!;
}
