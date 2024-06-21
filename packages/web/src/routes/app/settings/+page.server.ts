import { BACKEND_URL } from "$env/static/private";
import type { ApiResponse, ApiResponseWithData } from "$libs/types/ApiResponse";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    editAvatar: async ({ locals, request }) => {
        try {
            const formData = await request.formData();

            if (!formData.get("avatar")) {
                return fail(418, { message: "Aucune image n'a été envoyée..." });
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/me/avatar`, {
                method: 'PUT',
                body: formData,
                headers: {
                    accept: 'application/json',
                    authorization: locals.jwt!
                }
            });
            const result: ApiResponseWithData<string> = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: "Avatar modifié avec succès.", avatar: result.data }
        } catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
        }
    },
    deleteAvatar: async ({ locals }) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/me/avatar`, {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    authorization: locals.jwt!
                }
            });
            const result: ApiResponse = await response.json();

            if (!result.success) {
                return fail(422, { message: result.message });
            }

            return { message: "Avatar supprimé avec succès." }
        } catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
        }
    },
    editPassword: async ({ locals, request }) => {
        try {
            const formData = await request.formData();
            const oldPassword = formData.get("oldPassword")?.toString();
            const newPassword = formData.get("newPassword")?.toString();
            const confirmNewPassword = formData.get("confirmNewPassword")?.toString();

            if (!oldPassword || !newPassword || !confirmNewPassword) {
                return fail(422, { message: "Complétez tous les champs." });
            }

            if (newPassword !== confirmNewPassword) {
                return fail(422, { message: "Les nouveaux de mots de passe ne correspondent pas." });
            }

            const response = await fetch(`${BACKEND_URL}/api/v1/me/password`, {
                method: 'PUT',
                body: JSON.stringify({ oldPassword, newPassword }),
                headers: {
                    accept: 'application/json',
                    authorization: locals.jwt!,
                    "content-type": 'application/json'
                }
            });
            const result: ApiResponse = await response.json();

            if (!result.success) {
                return fail(422, { message: "L'ancien mot de passe ne correspond pas à celui qui a été donné." });
            }

            return { message: "Ton mot de passe a été modifié avec succès." }
        } catch (err) {
            console.error(err);
			return fail(422, { message: "Une erreur est survenue." });
        }
    },
};