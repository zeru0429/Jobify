export interface UserType {
  id: number;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  createdAt: string;
  password: string;
}
