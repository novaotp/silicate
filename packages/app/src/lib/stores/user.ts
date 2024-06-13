import type User from "@tabler/icons-svelte/IconUser.svelte";
import { get, writable } from "svelte/store";
import type { ApiResponseWithData } from "$shared/types/ApiResponse";
import { kv } from "$lib/utils/kv";
import { invoke } from "$lib/utils/custom_invoke";

let user = writable<User | undefined>(undefined);

export async function getUser(): Promise<User | undefined> {
    if (get(user)) {
        return get(user);
    }

    const response = await invoke<ApiResponseWithData<User>>("get_user", { jwt: await kv.get("id") });

    if (!response.success) {
        return undefined;
    }

    user.set(response.data);
    return get(user)!;
}
