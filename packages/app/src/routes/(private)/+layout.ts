import { redirect } from "@sveltejs/kit";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { buildUrl } from "$utils/url";
import { getJWTFromCookies } from "$utils/jwt";
import type { LayoutLoad } from "./$types";
import type { User } from "$common/models/user";
import type { ApiResponse, ApiResponseWithData } from "$common/types/api-response";

export const load: LayoutLoad = async () => {
    const token = getJWTFromCookies();
    if (!token) {
        throw redirect(303, buildUrl("/login", { message: "Connectez-vous pour accéder à l'application." }));
    }

    let response: ApiResponse;
    try {
        const _response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/authentication/validate`, {
            method: "POST",
            body: JSON.stringify({ jwt: token }),
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            }
        });

        response = await _response.json();
    } catch (error) {
        console.error(error);
        throw redirect(303, buildUrl("/login", { message: "Une erreur est survenue." }));
    }

    if (!response.success) {
        throw redirect(303, buildUrl("/login", { message: response.message }));
    }

    return {
        user: await getUser()
    };
};

const getUser = async () => {
    const token = getJWTFromCookies();

    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/me`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    const result: ApiResponseWithData<User> = await response.json();

    return result.success ? result.data : undefined;
}
