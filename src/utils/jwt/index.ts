
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { TextEncoder } from 'util';

/**
 * A intrinsic class that provides methods
 * for signing and verifying JWTs.
 */
class JWT {
  /**
   * Signs a payload to create a JWT and returns it.
   * @param payload The payload to sign
   * @returns The signed JWT token
   */
  static async sign(payload: any) {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expirationTime = issuedAt + (60 * 60) * 2; // two hours

    return await new SignJWT({ payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(expirationTime)
      .setIssuedAt(issuedAt)
      .setNotBefore(issuedAt)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  }

  /**
   * Verifies the JWT and returns the payload.
   * @param token The JWT token to verify
   * @returns The JWT payload after verification
   */
  static async verify(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return payload;
  }
}

export default JWT;
