import { getPreference } from "$utils/capacitor-preferences";
import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { ApiResponse } from "$common/types/api-response";
import { buildUrl } from "$utils/url";
import { Preferences } from "@capacitor/preferences";

export const load: LayoutLoad = async () => {
    const keys = (await Preferences.keys()).keys;
    if (!keys.includes("token")) {
        throw redirect(303, buildUrl("/login", { message: "Connectez-vous pour accéder à l'application." }));
    }

    const token = await getPreference<{ jwt: string, expires: Date }>('token', { parse: true });
    let response: ApiResponse;
    try {
        const _response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/auth/validate`, {
            method: "POST",
            body: JSON.stringify({ jwt: token.jwt }),
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

    return;
};
