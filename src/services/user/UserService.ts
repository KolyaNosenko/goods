import { UserInfo } from "./types";

export interface UserService {
  login(email: string, password: string): Promise<UserInfo>;
  logout(): Promise<void>;
}
