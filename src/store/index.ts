import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { createServicesReducer } from "./services";
import { userReducer } from "./user";
import {
  addItem,
  itemsReducer,
  removeItem,
  setItems,
  updateItem,
} from "./items";
import { isDevelopmentMode } from "src/utils";
import { UserService } from "src/services/user";
import { ItemsService } from "src/services/items";
import { StoreState, StoreActions } from "./types";

export * from "./user";
export * from "./items";

function getMiddlewares() {
  const middlewares = [thunk as ThunkMiddleware<StoreState, StoreActions>];

  if (isDevelopmentMode()) {
    middlewares.push(reduxLogger);
  }
  return middlewares;
}

function configureStore(userService: UserService, itemsService: ItemsService) {
  const combinedReducer = combineReducers({
    services: createServicesReducer(userService, itemsService),
    user: userReducer,
    items: itemsReducer,
  });

  return createStore(combinedReducer, applyMiddleware(...getMiddlewares()));
}

export type AppStore = ReturnType<typeof configureStore>;

export async function initializeStore(
  userService: UserService,
  itemsService: ItemsService
) {
  const store = configureStore(userService, itemsService);

  const items = await itemsService.getItems();

  store.dispatch(setItems(items));

  itemsService.onItemAdded((item) => {
    store.dispatch(addItem(item));
  });
  itemsService.onItemUpdated((item) => {
    store.dispatch(updateItem(item));
  });
  itemsService.onItemRemoved((itemId) => {
    store.dispatch(removeItem(itemId));
  });

  return store;
}
