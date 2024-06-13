import { type Cookies } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { User } from "$libs/models/User";
import { BACKEND_URL } from "$env/static/private";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";

const handleInvalid = (cookies: Cookies, message: string) => {
    cookies.delete("id", { path: "/" });
    return { message }
}

export const load: LayoutServerLoad = async ({ cookies }) => {
    const jwt = cookies.get("id")!;

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/me`, {
            method: "GET",
            headers: {
                "authorization": jwt
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
            return handleInvalid(cookies, result.message);
        }
    } catch {
        console.log("Something went wrong.")
        return handleInvalid(cookies, "Something went wrong.")
    }
};
