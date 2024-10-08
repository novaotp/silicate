import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { BACKEND_URL } from '$env/static/private';
import type { ApiResponse } from '$libs/types/ApiResponse';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const firstName = data.get("firstName")?.toString();
		const lastName = data.get("lastName")?.toString();
		const email = data.get("email")?.toString();
		const password = data.get("password")?.toString();
		const confirmPassword = data.get("confirmPassword")?.toString();

		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			return fail(422, { firstName, lastName, email, message: "Complétez tous les champs." });
		}

		if (password !== confirmPassword) {
			return fail(422, { firstName, lastName, email, message: "Les mots de passe ne correspondent pas." });
		}

		try {
			const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
				method: "POST",
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					password
				}),
				headers: {
					"accept": "application/json",
					"content-type": "application/json"
				}
			});
			const result: ApiResponse = await response.json();

			if (!result.success) {
				return fail(422, { firstName, lastName, email, message: "Une erreur est survenue." })
			}
		} catch (err) {
			console.error(`Something went wrong whilst registering a new user : ${(err as Error).message}`)
			return fail(422, { firstName, lastName, email, message: "Une erreur est survenue." });
		}

		throw redirect(303, "/login");
	},
} satisfies Actions;
