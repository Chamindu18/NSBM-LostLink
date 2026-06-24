export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  studentId: string;
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  studentId: string;
  name: string;
  email: string;
  role: string;
}