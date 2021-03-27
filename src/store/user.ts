import { UserDTO } from "src/services/user";
import { StoreState, ThunkedAction } from "./types";
import { createAction, createReducer } from "@reduxjs/toolkit";

export const isUserAdmin = (state: StoreState) => {
  return state.user && state.user.isAdmin;
};

export const getUser = (state: StoreState) => {
  return state.user;
};

export const userLoggedIn = createAction<UserDTO>("user/login");

export const userLoggedOut = createAction("user/logout");

export type UserActions =
  | ReturnType<typeof userLoggedIn>
  | ReturnType<typeof userLoggedOut>;

export function doLoginUser(email: string, password: string): ThunkedAction {
  return async function (dispatch, getState) {
    const { userService } = getState().services;
    const userData = await userService.login(email, password);
    dispatch(userLoggedIn(userData));
  };
}

export function doLogoutUser(): ThunkedAction {
  return async function (dispatch, getState) {
    const { userService } = getState().services;
    await userService.logout();
    dispatch(userLoggedOut());
  };
}

export type UserState = UserDTO & {
  isAuthenticated: boolean;
};

export const initialState: UserState = {
  id: "",
  email: "",
  isAdmin: false,
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userLoggedIn, (state, action) => {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    })
    .addCase(userLoggedOut, () => {
      return {
        ...initialState,
      };
    });
});
