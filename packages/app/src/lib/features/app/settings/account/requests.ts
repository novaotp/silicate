import { PUBLIC_BACKEND_URL } from "$env/static/public";
import type { User } from "$common/models/user";
import type { ApiResponseWithData, ApiResponse } from "$common/types/api-response";
import type { CropArea } from "./types";

export const updateAvatar = async (jwt: string, avatar: File, cropArea: CropArea) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('cropArea', JSON.stringify(cropArea));

    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/me/avatar`, {
        method: 'PUT',
        body: formData,
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${jwt}`
        }
    });

    return await response.json() as ApiResponseWithData<string>;
}

export const deleteAvatar = async (jwt: string) => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/me/avatar`, {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${jwt}`
        }
    });

    return await response.json() as ApiResponse;
}

export const updatePassword = async (jwt: string, oldPassword: string, newPassword: string) => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/me/password`, {
        method: 'PUT',
        body: JSON.stringify({ oldPassword, newPassword }),
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${jwt}`,
            "content-type": 'application/json'
        }
    });

    return await response.json() as ApiResponse;
}

/** Updates the first name, last name, email and bio. */
export const updateAccount = async (jwt: string, data: Pick<User, "firstName" | "lastName" | "email" | "bio">) => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/me`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${jwt}`,
            "content-type": 'application/json'
        }
    });

    return await response.json() as ApiResponse;
}

export const deleteAccount = async (jwt: string) => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/me`, {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${jwt}`,
            "content-type": 'application/json'
        }
    });

    return await response.json() as ApiResponse;
}
