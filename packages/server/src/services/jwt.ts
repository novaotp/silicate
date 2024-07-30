import { SignJWT, jwtVerify, type JWTPayload } from "jose";

type CustomJWTPayload = JWTPayload & {
    payload: {
        userId: number
    }
}

/**
 * Signs a payload to create a JWT and returns it.
 * @param payload The payload to sign
 * @returns The signed JWT token
 */
export const sign = async (payload: Record<string, unknown>) => {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expirationTime = issuedAt + 60 * 60 * 336; // 14 days

    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(expirationTime)
        .setIssuedAt(issuedAt)
        .setNotBefore(issuedAt)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return {
        token,
        expires: expirationTime * 1000
    }
};

/**
 * Verifies the JWT and returns the payload.
 * @param token The JWT token to verify
 * @returns The JWT payload after verification
 */
export const verify = async (token: string): Promise<CustomJWTPayload> => {
    const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    
    return verified.payload as CustomJWTPayload;
};

/** Authenticates a JWT and returns the user's id. */
export const authenticate = async (jwt: string): Promise<number | null> => {
    try {
        const userId = (await verify(jwt)).payload.userId;

        return userId;
    } catch {
        return null;
    }
}
