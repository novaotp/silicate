import { SignJWT, jwtVerify } from '../../frontend/node_modules/jose';
import { TextEncoder } from 'util';

/**
 * @typedef {import('../interfaces').PayloadProps} PayloadProps
 * @typedef {import('../../frontend/node_modules/jose').JWTPayload} JWTPayload
 */

/** JWT class to handle signing and verifying JWTs */
export default class JWT {
  /**
   * Sign a payload to create JWT
   * @param {PayloadProps} payload - Payload to sign
   * @returns {Promise<string>} - Signed JWT
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
   * Verify JWT
   * @param {string} token - JWT token
   * @returns {Promise<JWTPayload>} - JWT payload after verification
   */
  static async verify(token) {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return payload;
  }
}
