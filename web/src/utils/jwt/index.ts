
"use server";

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { encodeString } from "../textencoder";

type CustomJWTPayload = JWTPayload & {
    payload: {
        userId: string
    }
}

/**
 * Signs a payload to create a JWT and returns it.
 * @param payload The payload to sign
 * @returns The signed JWT token
 */
export const sign = async (payload: any): Promise<string> => {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expirationTime = issuedAt + 60 * 60 * 336; // 14 days

    return await new SignJWT({ payload })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(expirationTime)
        .setIssuedAt(issuedAt)
        .setNotBefore(issuedAt)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

/**
 * Verifies the JWT and returns the payload.
 * @param token The JWT token to verify
 * @returns The JWT payload after verification
 */
export const verify = async (token: string): Promise<CustomJWTPayload> => {
    let payload: CustomJWTPayload = {} as CustomJWTPayload;

    try {
        payload = (
            await jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET)
            )
        ).payload as CustomJWTPayload;
    } catch {
        payload = (
            await jwtVerify(token, encodeString(process.env.JWT_SECRET!))
        ).payload as CustomJWTPayload;
    } finally {
        return payload;
    }
};
