export type UserListType = {
  _id: string;
  firstName: string;
  lastName: string;
  role: "admin" | "super_admin" | undefined;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
