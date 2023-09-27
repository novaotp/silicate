
// Jose
import { type JWTPayload } from '../../frontend/node_modules/jose';

// Internal
import { ResponseProps } from './common';

export interface SignUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface VerifyTokenProps {
  jwt: string | undefined;
}

export interface AuthResponseProps extends ResponseProps {
  jwt?: string;
}

export interface TokenResponseProps extends ResponseProps {
  payload?: JWTPayload & {
    payload: {
      userID: number
    }
  };
}
