
// Jose
import { type JWTPayload } from '../../frontend/node_modules/jose';

// Internal
import { ResponseProps } from './common';

/** A request interface for signing up a new user. */
export interface SignUpRequestProps {
  /** The first name of the new user. */
  firstName: string;
  /** The last name of the new user. */
  lastName: string;
  /** The email of the new user. */
  email: string;
  /** The password of the new user. */
  password: string;
}

/** A response interface for signing up a new user. */
export interface SignUpResponseProps extends ResponseProps {
  /** The JWT of the user. */
  jwt?: string;
}

/** A request interface for loging in an existing user. */
export interface LoginRequestProps {
  /** The email of the existing user. */
  email: string;
  /** The password of the existing user. */
  password: string;
}

/** A response interface for loging in an existing user. */
 export interface LoginResponseProps extends ResponseProps {
  /** The JWT of the user. */
  jwt?: string;
}

/** A request interface for verifying a JWT. */
export interface VerifyTokenRequestProps {
  /** The JWT to verify. */
  jwt: string | undefined;
}

 /** A response interface for verifying a JWT. */
export interface VerifyTokenResponseProps extends ResponseProps {
  /** The payload of the JWT if JWT validated, otherwise `undefined`. */
  payload?: JWTPayload & {
    /** Some data stored in the JWT. */
    payload: {
      /** The ID of the user. */
      userID: number
    }
  };
}
