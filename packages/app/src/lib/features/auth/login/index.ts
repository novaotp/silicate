import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { ApiResponseWithData } from '$common/types/api-response';

export type LoginResponse = ApiResponseWithData<{ jwt: string; expires: number }>;

/**
 * Sends a login request to the server.
 * @param email The email of the account to log into.
 * @param password The password of the account to log into.
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/auth/login`, {
		method: 'POST',
		body: JSON.stringify({
			email,
			password
		}),
		headers: {
			accept: 'application/json',
			'content-type': 'application/json'
		}
	});
	
    return await response.json();
};
