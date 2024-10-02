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
