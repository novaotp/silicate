import { redirect } from '@sveltejs/kit';

export const handle = async ({ resolve, event }) => {
    event.locals.jwt = event.cookies.get("id");
    const pathname = event.url.pathname;

    if (pathname === "/" && event.locals.jwt) {
        throw redirect(303, "/app");
    }

    if (pathname.startsWith("/app") && !event.locals.jwt) {
        throw redirect(303, "/auth/login");
    }

    return resolve(event);
};
