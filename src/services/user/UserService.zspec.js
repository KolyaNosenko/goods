import { isEmailValid, isPasswordValid } from "./UserService";
import { EMAIL } from "../../tests-utils";

describe("isEmailValid", () => {
  test.each([[""], [null], [undefined], [1], ["1232$mail.com"]])(
    "When pass invalid, then return false",
    (email) => {
      const result = isEmailValid(email);
      expect(result).toBe(false);
    }
  );

  test("When pass valid, then return true", () => {
    const result = isEmailValid(EMAIL);
    expect(result).toBe(true);
  });
});

describe("isPasswordValid", () => {
  test.each([[""], [null], [undefined], [1], ["1234"]])(
    "When pass invalid, then return false",
    (password) => {
      const result = isPasswordValid(password);
      expect(result).toBe(false);
    }
  );

  test("When pass valid, then return true", () => {
    const result = isPasswordValid("123456");
    expect(result).toBe(true);
  });
});
