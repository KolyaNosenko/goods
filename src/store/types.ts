import { UserState, UserActions } from "./user";
import { ItemsState, ItemsActions } from "./items";
import { ServicesState } from "./services";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { UserService } from "../services/user";
import { ItemsService } from "../services/items";

export type StoreState = {
  user: UserState;
  items: ItemsState;
  services: ServicesState;
};

export type StoreActions = UserActions | ItemsActions;

export type ThunkExtraContext = {
  userService: UserService;
  itemsService: ItemsService;
};

export type ThunkedAction<T = void> = ThunkAction<
  T,
  StoreState,
  ThunkExtraContext,
  StoreActions
>;

export type StoreDispatch = ThunkDispatch<
  StoreState,
  ThunkExtraContext,
  StoreActions
>;
