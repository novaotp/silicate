import { db } from '$database';
import type { RawUser, User } from '$database/models/User';
import { verify } from '$utils/jwt';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/app')) {
		const jwt = event.cookies.get("id");

		if (!jwt) {
        	redirect(307, "/auth/login");
		}

		const userId = (await verify(jwt)).payload.userId;
		
		let user: User;
		try {
			const client = await db.connect();

			const { rows } = await client.query<RawUser>("SELECT * FROM public.user WHERE id = $1 LIMIT 1;", [userId]);

			user = rows[0].transform();

			client.release();
		} catch (err) {
			throw redirect(307, "/auth/login");
		}

		if (!user) {
			event.cookies.delete("id", { path: "/" });
			throw redirect(307, "/auth/login");
		}

		event.locals.user = user;
    }

	const response = await resolve(event);
	return response;
};
