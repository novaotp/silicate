import { SignJWT, jwtVerify, type JWTPayload } from "jose";

/**
 * Signs a payload to create a JWT and returns it.
 * @param payload The payload to sign
 * @returns The signed JWT token
 */
export const sign = async (payload: { userId: string }) => {
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
 * Verifies a JSON Web Token.
 * @returns The payload inside the JSON Web Token.
 * @throws Throws an error if the token is invalid.
 */
export const verify = async (token: string): Promise<JWTPayload & { userId: string }> => {
    const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    
    return verified.payload as unknown as JWTPayload & { userId: string };
};

/** Returns the user's id or `null` if the JSON Web Token is invalid. */
export const getUserId = async (jwt: string): Promise<string | null> => {
    try {
        const userId = (await verify(jwt)).userId;

        return userId;
    } catch {
        return null;
    }
}
