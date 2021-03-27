import {
  ItemsState,
  UserState,
  StoreState,
  ThunkExtraContext,
} from "src/store";
import { TestableItemsService } from "./TestableItemsService";
import { TestableUserService } from "./TestableUserService";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { EMAIL, ID } from "./misc";

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
