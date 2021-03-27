import { UserState, UserActions } from "./user";
import { ItemsState, ItemsActions } from "./items";
import { ServicesState } from "./services";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export type StoreState = {
  user: UserState;
  items: ItemsState;
  services: ServicesState;
};

export type StoreActions = UserActions | ItemsActions;

export type ThunkedAction<T = void> = ThunkAction<
  T,
  StoreState,
  unknown,
  StoreActions
>;

export type StoreDispatch = ThunkDispatch<StoreState, unknown, StoreActions>;
