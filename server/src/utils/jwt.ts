import { SignJWT, jwtVerify, type JWTPayload } from "jose";

/**
 * Encodes a string to Uint8Array.
 * @param str The string to encode
 */
const encodeString = (str: string): Uint8Array => {
    // Encode string to UTF-8
    const utf8 = unescape(encodeURIComponent(str));

    // Create a Uint8Array to hold the character codes
    const uint8Array = new Uint8Array(utf8.length);

    // Convert each character to a byte (character code) and add to Uint8Array
    for (let i = 0; i < utf8.length; i++) {
        uint8Array[i] = utf8.charCodeAt(i);
    }

    return uint8Array;
};

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
export const sign = async (payload: unknown) => {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expirationTime = issuedAt + 60 * 60 * 336; // 14 days

    const token = await new SignJWT({ payload })
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
    }
    
    return payload;
};
