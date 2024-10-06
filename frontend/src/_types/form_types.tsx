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
  role: "admin" | "super_admin" | undefined;
  password: string;
  confirmPassword: string;
  createdBy: number;
}
export interface RegisterCompanyFormType {
  name: string;
  type: string;
  logo?: File[] | null;
  companyType: string;
  address: string;
  description?: string;
}

export interface RegisterJobFormType {
  title: string;
  type: string;
  description: string;
  location: string;
  createdAt: Date;
  salary: number;
  contactEmail: string;
  company: string;
  createdBy: string;
  isAvailable?: boolean;
}

export interface ApplicationFormType {
  job: string;
  applicantName: string;
  applicantEmail: string;
  resume?: File | null;
  coverLetter?: File | null;
  status: "applied" | "interviewed" | "offered" | "rejected";
}
