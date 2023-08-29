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