import { UserDTO } from "./types";

export interface UserService {
  login(email: string, password: string): Promise<UserDTO>;
  logout(): Promise<void>;
}
