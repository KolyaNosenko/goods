import {
  EMAIL,
  getStoreStateMock,
  getUserStateMock,
  ID,
} from "src/tests-utils";
import {
  getUser,
  isUserAdmin,
  userLoggedIn,
  userLoggedOut,
  userReducer,
  initialState,
} from "./user";

describe("Selectors", () => {
  describe("isUserAdmin", () => {
    test("When user is admin, then return true", () => {
      const userState = getUserStateMock({ isAdmin: true });
      const state = getStoreStateMock({ user: userState });

      const isAdmin = isUserAdmin(state);

      expect(isAdmin).toBe(true);
    });

    test("When user is not admin, then return false", () => {
      const userState = getUserStateMock({ isAdmin: false });
      const state = getStoreStateMock({ user: userState });

      const isAdmin = isUserAdmin(state);

      expect(isAdmin).toBe(false);
    });
  });

  describe("getUser", () => {
    test("When call, then user from state", () => {
      const user = {
        id: ID,
        email: EMAIL,
        isAdmin: true,
        isAuthenticated: true,
      };
      const state = getStoreStateMock({ user });

      const result = getUser(state);

      expect(result).toEqual(user);
    });
  });
});

describe("Reducer", () => {
  test("When call userLoggedIn, then set user and update isAuthorized flag", () => {
    const user = {
      id: ID,
      email: EMAIL,
      isAdmin: true,
    };
    const action = userLoggedIn(user);

    const result = userReducer(
      getUserStateMock({ isAuthenticated: false }),
      action
    );

    expect(result).toEqual(
      expect.objectContaining({
        ...user,
        isAuthenticated: true,
      })
    );
  });

  test("When call userLoggedOut, then reset state to initial value", () => {
    const action = userLoggedOut();
    const userState = getUserStateMock({ id: ID, email: EMAIL });

    const result = userReducer(userState, action);

    expect(userState).not.toEqual(initialState);
    expect(result).toEqual(initialState);
  });
});
