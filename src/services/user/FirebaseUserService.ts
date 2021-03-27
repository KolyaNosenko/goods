import firebase from "firebase/app";
import { InvalidData } from "src/errors";
import { UserDTO, UserAdditionalInfoDTO } from "./types";
import { UserService } from "./UserService";

export function isEmailValid(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}

export function isPasswordValid(password: string): boolean {
  return !!(password && typeof password === "string" && password.length >= 5);
}

export class FirebaseUserService implements UserService {
  private firebaseApp: firebase.app.App;

  constructor(firebaseApp: firebase.app.App) {
    this.firebaseApp = firebaseApp;
  }

  private async getAdditionalUserData(
    userId: string
  ): Promise<UserAdditionalInfoDTO> {
    const snapshot = await this.firebaseApp
      .database()
      .ref("users")
      .child(userId)
      .get();

    return snapshot.val();
  }

  async login(email: string, password: string): Promise<UserDTO> {
    // TODO add more custom errors handling
    if (!isEmailValid(email) || !isPasswordValid(password))
      throw new InvalidData("Invalid data");

    const { user } = await this.firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password);
    // TODO add
    if (!user) throw Error("User not found");

    const additionalData = await this.getAdditionalUserData(user.uid);
    return {
      id: user.uid,
      email: user.email || email,
      ...additionalData,
    };
  }

  logout() {
    return this.firebaseApp.auth().signOut();
  }
}
