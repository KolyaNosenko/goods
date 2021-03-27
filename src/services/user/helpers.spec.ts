import { isEmailValid, isPasswordValid } from "./helpers";
import { EMAIL } from "src/tests-utils";

describe("isEmailValid", () => {
  test.each([[""], ["1232$mail.com"]])(
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
  test.each([[""], ["1234"]])(
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
