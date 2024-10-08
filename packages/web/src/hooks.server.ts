import { redirect } from '@sveltejs/kit';

FormData.prototype.toJSON = function(): Record<string, string> {
    const json: Record<string, string> = {};

    this.forEach((value, key) => {
        json[key] = value.toString();
    });

    return json;
}

export const handle = async ({ resolve, event }) => {
    event.locals.jwt = event.cookies.get("id");
    const pathname = event.url.pathname;

    if (pathname === "/" && event.locals.jwt) {
        throw redirect(303, "/app");
    }

    if (pathname.startsWith("/app") && !event.locals.jwt) {
        const message = "Connectez-vous pour accéder à votre compte.";
        throw redirect(303, `/login?message=${encodeURIComponent(message)}`);
    }

    return resolve(event);
};
