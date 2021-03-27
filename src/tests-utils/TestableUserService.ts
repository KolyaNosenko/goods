import { UserDTO, UserService } from "src/services/user";
import { getUserDTO } from "./index";

export class TestableUserService implements UserService {
  login(email: string, password: string): Promise<UserDTO> {
    return Promise.resolve(getUserDTO({ email }));
  }
  logout(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
