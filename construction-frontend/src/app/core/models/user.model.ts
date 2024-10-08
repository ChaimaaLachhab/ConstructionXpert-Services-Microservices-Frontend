import {Role} from "../enums/role";

export interface User {
  id: number;
  fullName: string;
  username: string;
  password?: string;
  email: string;
  role: Role;
}
