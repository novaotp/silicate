import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, locals }) => {
    cookies.delete("id", { path: "/" });
    locals.jwt = undefined;
    throw redirect(303, "/login");
};
