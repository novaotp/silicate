import { redirect } from '@sveltejs/kit';

export const handle = async ({ resolve, event }) => {
    if (event.url.pathname.startsWith("/app") && !event.cookies.get("id")) {
        throw redirect(303, "/auth/login");
    }

    return resolve(event);
};
