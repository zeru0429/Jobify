export type UserListType = {
  _id: string;
  firstName: string;
  lastName: string;
  role: "super_admin" | "admin" | "user";
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
