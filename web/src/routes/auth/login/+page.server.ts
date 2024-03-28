import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { compare } from 'bcrypt';
import { type User } from '$libs/models/User';
import { sign, verify } from '$lib/utils/jwt';
import { BACKEND_URL } from '$env/static/private';
import type { ApiResponseWithData } from '$libs/types/ApiResponse';

export const load: PageServerLoad = async ({ cookies }) => {
	const jwt = cookies.get("id");

	if (!jwt) {
		return;
	}

	const userId = (await verify(jwt)).payload.userId;

	let user: User;
	try {
		const response = await fetch(`${BACKEND_URL}/users/${userId}`);
		const result: ApiResponseWithData<User> = await response.json();

		user = result.data;
	} catch (err) {
		cookies.delete("id", { path: "/" });
		return;
	}

	if (!user) {
		cookies.delete("id", { path: "/" });
		return;
	}

	throw redirect(303, "/app")
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
			const response = await fetch(`${BACKEND_URL}/users`);
			const result: ApiResponseWithData<User[]> = await response.json();

			user = result.data.find(user => user.email === email);
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

		throw redirect(303, "/app");
	},
} satisfies Actions;
