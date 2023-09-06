
import { type JWTPayload } from '../../frontend/node_modules/jose';

interface ResponseProps {
  success: boolean;
  message: string;
}

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

export interface GradebookProps {
  name: string;
}

export interface SubjectProps {
  name: string;
}

export interface GradeProps {
  title: string;
  value: string;
}

export interface PayloadProps {
  id: string;
}

export interface FriendRequestProps {
  firstUserID: number;
  secondUserID: number;
}