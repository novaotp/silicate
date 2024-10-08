import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { BACKEND_URL } from '$env/static/private';
import type { ApiResponse, ApiResponseWithData } from '$libs/types/ApiResponse';

export const load: PageServerLoad = async ({ cookies, locals }) => {
    // The user wasn't previously connected
    // No need to try to redirect him
	if (!locals.jwt) return;

	try {
		const response = await fetch(`${BACKEND_URL}/auth/validate`, {
			method: "POST",
			body: JSON.stringify({ jwt: locals.jwt }),
			headers: {
				"content-type": "application/json"
			}
		});
		const { success }: ApiResponse = await response.json();

		if (!success) {
			cookies.delete("id", { path: "/" });
            locals.jwt = undefined;
			return;
		}
	} catch (err) {
		console.error(`Something went wrong whilst validating a user in the login page : ${(err as Error).message}`)
		return;
	}

	throw redirect(303, "/app");
};

export const actions = {
	default: async ({ locals, request, cookies }) => {
		const data = await request.formData();

		const email = data.get("email")?.toString();
		const password = data.get("password")?.toString();

		if (!email || !password) {
			return fail(422, { email, message: "Complétez tous les champs." });
		}

		try {
			const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
				method: "POST",
				body: JSON.stringify({
					email,
					password
				}),
				headers: {
					"content-type": "application/json"
				}
			});
			const result: ApiResponseWithData<{ jwt: string, expires: number }> = await response.json();

			if (!result.success) {
				return fail(422, { email, message: "Données erronées." });
			}

            const { jwt, expires } = result.data;

			cookies.set("id", jwt, { httpOnly: true, secure: true, path: "/", expires: new Date(expires) });
            locals.jwt = jwt;
		} catch (err) {
			console.error(`Something went wrong whilst login a user : ${(err as Error).message}`)
			return fail(422, { email, message: "Une erreur est survenue." });
		}

		throw redirect(303, "/app");
	},
} satisfies Actions;
