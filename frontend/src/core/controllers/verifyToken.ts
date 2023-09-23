

import { serverRoute } from "@shared/classes/route";
import {ResponseProps, TokenResponseProps, VerifyTokenProps} from "@shared/interfaces";
import {cookies} from "next/headers";

export default class VerifyToken {
    static async api(data: VerifyTokenProps): Promise<TokenResponseProps> {
        'use server';

        const url = process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use();
        const init: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: "no-store"
        }
        const response = await fetch(url, init);
        const result: TokenResponseProps = await response.json();

        return result;
    }

    static async validation(): Promise<TokenResponseProps> {
        const cookie = cookies().get('id');

        if (!cookie) {
            return { success: false, message: "No cookie <id> found" }
        }

        const tokenResponse: TokenResponseProps = await this.api({ jwt: cookie.value });

        if (!tokenResponse.success) {
            return { success: false, message: tokenResponse.message }
        }

        return tokenResponse;
    }
}
