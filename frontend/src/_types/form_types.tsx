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

export interface RegisterJobFormType {
  title: string;
  type: string;
  description: string;
  location: string;
  createdAt: Date;
  salary: number;
  contactEmail: string;
  createdBy: string;
  company: string;
  updatedAt?: Date;
}

export interface ApplicationFormType {
  job: string;
  applicantName: string;
  applicantEmail: string;
  resume?: string;
  coverLetter?: string;
  status: "applied" | "interviewed" | "offered" | "rejected";
  appliedAt?: Date;
}
