import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    cookies.delete("id", { path: "/" });
    throw redirect(303, "/auth/login")
};
