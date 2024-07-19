import type { LayoutServerLoad } from "./$types";
import type { User } from "$libs/models/User";
import { BACKEND_URL } from "$env/static/private";
import type { ApiResponseWithData } from "$libs/types/ApiResponse";
import type { TaskNotification } from "$libs/models/Task";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals }) => {
    try {
        const userResult = await getUser(locals.jwt!);

        if (userResult.success) {
            return {
                // @ts-expect-error Lazy to check if it worked or not.
                taskNotifications: (await getTaskNotifications(locals.jwt!)).data as TaskNotification[],
                jwt: locals.jwt!,
                user: userResult.data
            }
        }
    } catch (err) {
        console.error(err);
    }

    throw redirect(303, "/logout");
};

const getUser = async (jwt: string): Promise<ApiResponseWithData<User>> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/me`, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${jwt}`
        }
    });
    return await response.json();
}

const getTaskNotifications = async (jwt: string): Promise<ApiResponseWithData<TaskNotification[]>> => {
    const response = await fetch(`${BACKEND_URL}/api/v1/tasks/notifications`, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${jwt}`
        }
    });
    return await response.json();
}
