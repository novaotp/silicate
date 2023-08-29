import { SignJWT, jwtVerify, type JWTPayload } from '../../frontend/node_modules/jose';
import { PayloadProps } from '../interfaces';

// Reference : https://stackoverflow.com/a/72830573/20892950
export default class JWT {
  static async sign(payload: PayloadProps): Promise<string> {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expirationTime = issuedAt + (60 * 60) * 2; // two hour

    return await new SignJWT({ payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(expirationTime)
      .setIssuedAt(issuedAt)
      .setNotBefore(issuedAt)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  }

  static async verify(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    // run some checks on the returned payload, perhaps you expect some specific values

    // if its all good, return it, or perhaps just return a boolean
    return payload;
  }
}