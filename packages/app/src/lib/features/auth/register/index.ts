import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { ApiResponse } from '$common/types/api-response';

export type RegisterResponse = ApiResponse;

/**
 * Sends a register request to the server.
 * @param firstName The first name of the user.
 * @param lastName The last name of the user.
 * @param email The email of the account to log into.
 * @param password The password of the account to log into.
 */
export const register = async (firstName: string, lastName: string, email: string, password: string): Promise<RegisterResponse> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        }),
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        }
    });
	
    return await response.json();
};
