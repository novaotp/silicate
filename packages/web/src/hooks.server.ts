import { redirect } from '@sveltejs/kit';

export const handle = async ({ resolve, event }) => {
    event.locals.jwt = event.cookies.get("id");

    if (event.url.pathname === "/" && event.locals.jwt) {
        throw redirect(303, "/app");
    }

    if (event.url.pathname.startsWith("/app") && !event.locals.jwt) {
        throw redirect(303, "/auth/login");
    }

    return resolve(event);
};
