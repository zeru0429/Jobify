export interface LoginFormType {
  email: String;
  password: String;
}

export interface ErrorResponseType {
  data: {
    message: string;
    success: boolean;
  };
}

export interface RegisterUserFormType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  createdBy: number;
}

export interface RegisterCompanyFormType {
  name: string;
  logo?: string;
  adminId?: number;
}
