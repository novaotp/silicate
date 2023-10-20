
import { SignJWT, jwtVerify } from 'jose';
import { TextEncoder } from 'util';

/**
 * @typedef {import('../interfaces').PayloadProps} PayloadProps
 * @typedef {import('../../frontend/node_modules/jose').JWTPayload} JWTPayload
 */

/** A static class to handle signing and verifying JWTs. */
class JWT {
  /**
   * Signs a payload to create a JWT.
   * @param {PayloadProps} payload The payload to sign
   * @returns {Promise<string>} The signed JWT
   */
  static async sign(payload) {
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
   * Verifies the JWT.
   * @param {string | undefined} token The JWT token to verify
   * @returns {Promise<JWTPayload>} The JWT payload after verification
   */
  static async verify(token) {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return payload;
  }
}

export default JWT;
