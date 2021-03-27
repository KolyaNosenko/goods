import { ItemDTO } from "src/services/items";
import { ItemsState, UserState } from "src/store";
import { TestableItemsService } from "./TestableItemsService";
import { UserDTO } from "src/services/user";
import { TestableUserService } from "./TestableUserService";
import { StoreState, ThunkExtraContext } from "src/store/types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

export const EMAIL = "email@mailto.com";

export const ID = "-MT7E8PBs017qAfnCN3l";

export * from "./TestableItemsService";
export * from "./TestableUserService";
export * from "./NotificationContext";

export function getEmailSample() {
  return "email@mailto.com";
}

export function getPasswordSample() {
  return "123123123";
}

export function getItemSample(data = {}) {
  return {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    discount: 10,
    discountExpireAt: 1652911162570,
    id: "-MT7E8PBs017qAfnCN3l",
    image: "https://firebasestorage.googleapis.com/v0/b/cr-...",
    price: 100,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    updatedAt: 1652911162570,
    ...data,
  };
}

export function getItemDTO(options: Partial<ItemDTO> = {}): ItemDTO {
  return {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    discount: 10,
    discountExpireAt: 1652911162570,
    id: "-MT7E8PBs017qAfnCN3l",
    image: "https://firebasestorage.googleapis.com/v0/b/cr-...",
    price: 100,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    updatedAt: 1652911162570,
    ...options,
  };
}

export function getUserDTO(options: Partial<UserDTO> = {}): UserDTO {
  return {
    isAdmin: false,
    email: EMAIL,
    id: ID,
    ...options,
  };
}

export function getItemsStateMock(items: Partial<ItemsState> = {}): ItemsState {
  return Object.values(items).reduce((acc, item) => {
    if (!item || !item.id) return acc;

    return {
      ...acc,
      [item.id]: {
        ...item,
        id: item.id,
      },
    };
  }, {});
}

export function getUserStateMock(user: Partial<UserState> = {}): UserState {
  return {
    id: ID,
    email: EMAIL,
    isAdmin: false,
    isAuthenticated: false,
    ...user,
  };
}

export function getStoreStateMock(
  storeState: Partial<StoreState> = {}
): StoreState {
  return {
    items: getItemsStateMock(storeState.items),
    user: getUserStateMock(storeState.user),
    ...storeState,
  };
}

export function createStoreContext(
  context: Partial<ThunkExtraContext> = {}
): ThunkExtraContext {
  return {
    itemsService: new TestableItemsService(),
    userService: new TestableUserService(),
    ...context,
  };
}

export function createStore(
  options: Partial<{
    state: Partial<StoreState>;
    context: Partial<ThunkExtraContext>;
  }> = {}
) {
  const storeContext = createStoreContext(options.context);
  const middlewares = [thunk.withExtraArgument(storeContext)];
  const mockStore = configureMockStore(middlewares);

  return mockStore(getStoreStateMock(options.state));
}
