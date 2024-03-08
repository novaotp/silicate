import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { hash } from 'bcrypt';
import { db } from '$database';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const firstName = data.get("firstName")?.toString();
		const lastName = data.get("lastName")?.toString();
		const email = data.get("email")?.toString();
		const password = data.get("password")?.toString();
		const confirmPassword = data.get("confirmPassword")?.toString();

		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			return fail(422, { firstName, lastName, email, missing: true });
		}

		if (password !== confirmPassword) {
			return fail(422, { firstName, lastName, email, notMatching: true });
		}

		const hashedPassword = await hash(password, 15);

		try {
			const client = await db.connect();

			await client.query("INSERT INTO public.user (first_name, last_name, email, password) VALUES ($1, $2, $3, $4);", [firstName, lastName, email, hashedPassword]);

			client.release();
		} catch (err) {
			console.error(`Something went wrong whilst registering a new user : ${(err as Error).message}`)
			return fail(422, { firstName, lastName, email, dbError: true });
		}

		throw redirect(307, "/auth/login");
	},
} satisfies Actions;
