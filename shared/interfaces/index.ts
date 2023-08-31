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

export interface AuthResponseProps {
  success: boolean;
  message: string;
  jwt?: string;
}

export interface TokenResponseProps {
  success: boolean;
  message: string;
  payload: any;
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