import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { compare } from 'bcrypt';
import { db } from '$database';
import { type User } from '$database/models/User';
import { sign, verify } from '$utils/jwt';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		return {
			user: {
				email: locals.user.email
			}
		}
	}

	return;
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const email = data.get("email")?.toString();
		const password = data.get("password")?.toString();

		if (!email || !password) {
			return fail(422, { email, missing: true });
		}

		let user: User | undefined = undefined;
		try {
			const client = await db.connect();

			const { rows } = await client.query<User>(`
					SELECT
						id,
						first_name as firstName,
						last_name as lastName,
						email,
						password,
						created_at as joinedOn
					FROM public.user
					WHERE email = '$1' LIMIT 1;
				`, [email]
			);

			user = rows[0];

			client.release();
		} catch (err) {
			console.error(`Something went wrong whilst login a new user : ${(err as Error).message}`)
			return fail(422, { email, dbError: true });
		}

		if (!user || !(await compare(password, user.password))) {
			return fail(422, { email, incorrect: true });
		}

		const jwt = await sign({ userId: user.id });
		const payload = await verify(jwt);

		cookies.set("id", jwt, { path: "/", maxAge: payload.exp! - payload.iat! });

		throw redirect(307, "/app");
	},
} satisfies Actions;
