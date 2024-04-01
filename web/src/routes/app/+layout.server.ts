import { redirect, type Cookies } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { User } from "$libs/models/User";
import { BACKEND_URL } from "$env/static/private";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";

const handleInvalid = (cookies: Cookies): never => {
    cookies.delete("id", { path: "/" });
    throw redirect(303, "/auth/login");
}

export const load: LayoutServerLoad = async ({ cookies }) => {
    const jwt = cookies.get("id");

    if (!jwt) {
        console.log("No token found.")
        handleInvalid(cookies);
    }

    try {
        const response = await fetch(`${BACKEND_URL}/me`, {
            method: "GET",
            headers: {
                "authorization": jwt!
            }
        });
        const result: ApiResponseWithData<User> = await response.json();

        if (result.success) {
            return {
                /** The JWT token for authentication when sending requests. */
                jwt: jwt,
                user: result.data
            }
        } else {
            console.log(result.message)
        }
    } catch {
        console.log("Something went wrong.")
        handleInvalid(cookies)
    }

    handleInvalid(cookies);
};
