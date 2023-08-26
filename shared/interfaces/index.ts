export interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface AuthResponseProps {
  success: boolean;
  message: string;
  data?: any;
}