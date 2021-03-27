import { UserService } from "src/services/user";
import { ItemsService } from "src/services/items";

export type ServicesState = {
  userService: UserService;
  itemsService: ItemsService;
};

export function createServicesReducer(
  userService: UserService,
  itemsService: ItemsService
) {
  const initialValue = {
    userService,
    itemsService,
  };
  return function (state: ServicesState = initialValue) {
    return state;
  };
}
