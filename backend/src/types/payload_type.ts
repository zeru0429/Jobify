import { Role } from "./user_type.js";

export interface PayloadType {
  id: number;
  firstName: string;
  role: Role;
}
