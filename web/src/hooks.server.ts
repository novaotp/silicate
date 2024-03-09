import type { User } from '../../libs/models/User';
import { BACKEND_URL } from '$env/static/private';
import { type ApiResponseWithData } from "../../libs/types/ApiResponse";
import { verify } from './utils/jwt';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/app')) {
		const jwt = event.cookies.get("id");

		if (!jwt) {
        	redirect(303, "/auth/login");
		}

		const userId = (await verify(jwt)).payload.userId;
		
		let user: User;
		try {
			const response = await fetch(`${BACKEND_URL}/users/${userId}`);
			const result: ApiResponseWithData<User> = await response.json();

			user = result.data;
		} catch (err) {
			event.cookies.delete("id", { path: "/" });
			throw redirect(303, "/auth/login");
		}

		if (!user) {
			event.cookies.delete("id", { path: "/" });
			throw redirect(303, "/auth/login");
		}

		event.locals.user = user;
    }

	const response = await resolve(event);
	return response;
};
