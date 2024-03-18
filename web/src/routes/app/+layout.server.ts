import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { verify } from "$utils/jwt";
import type { User } from "$libs/models/User";
import { BACKEND_URL } from "$env/static/private";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const jwt = cookies.get("id");

    if (!jwt) {
        throw redirect(303, "/auth/login");
    }

    const userId = (await verify(jwt)).payload.userId;

    try {
        const response = await fetch(`${BACKEND_URL}/users/${userId}`);
        const { success, data }: ApiResponseWithData<User> = await response.json();

        if (!success) {
            cookies.delete("id", { path: "/" });
            throw redirect(303, "/auth/login");
        }

        return {
            user: data
        }
    } catch {
        cookies.delete("id", { path: "/" });
        throw redirect(303, "/auth/login");
    }
};
