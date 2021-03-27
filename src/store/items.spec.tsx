import configureMockStore from "redux-mock-store";
import {
  doAddItem,
  doRemoveItem,
  doUpdateItem,
  getItem,
  getSortedItems,
  itemsReducer,
} from "./items";
import { getItemSample } from "../tests-utils";
import thunk from "redux-thunk";
import { ItemsService } from "../services/items/ItemsService";

jest.mock("../services/items/ItemsService");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Selectors", () => {
  describe("getItem", () => {
    // TODO add more tests
    test("When item with price, then return item with float price", () => {
      const item = getItemSample({ price: 100 });
      const state = { items: { [item.id]: item } };

      const result = getItem(state, item.id);

      expect(result.price).toBe("1.00");
    });

    test("When item have discount, then return  float newPrice base on discount", () => {
      const item = getItemSample({ price: 100, discount: 10 });
      const state = { items: { [item.id]: item } };

      const result = getItem(state, item.id);

      expect(result.newPrice).toBe("0.90");
    });

    test("When item not have discount, then return 0 newPrice", () => {
      const item = getItemSample({ price: 100, discount: 0 });
      const state = { items: { [item.id]: item } };

      const result = getItem(state, item.id);

      expect(result.newPrice).toBe(0);
    });
  });

  describe("getSortedItems", () => {
    test("When state has items, then return sorted array by updatedAt", () => {
      const item1 = getItemSample({ id: "1", updatedAt: 1 });
      const item2 = getItemSample({ id: "2", updatedAt: 2 });
      const state = { items: { [item1.id]: item1, [item2.id]: item2 } };
      const result = getSortedItems(state);

      expect(result[0].id).toBe(item2.id);
      expect(result[1].id).toBe(item1.id);
    });

    test("When state empty, then return empty array", () => {
      const result = getSortedItems({});

      expect(result).toEqual(expect.any(Array));
    });
  });
});

describe("Reducer", () => {
  test("When SET_ITEMS call, then set items map to state", () => {
    const item1 = getItemSample();
    const item2 = getItemSample();
    const items = [item1, item2];

    const action = { type: SET_ITEMS, payload: items };

    const result = itemsReducer({}, action);

    expect(result[item1.id]).toEqual(item1);
    expect(result[item2.id]).toEqual(item2);
  });

  test("When ADD_ITEM, then add new item", () => {
    const item = getItemSample();
    const action = { type: ADD_ITEM, payload: item };

    const result = itemsReducer({}, action);

    expect(result[item.id]).toEqual(item);
  });

  test("When UPDATE_ITEM, then update exist item", () => {
    const item = getItemSample({ price: 10 });
    const newPrice = 20;
    const action = { type: UPDATE_ITEM, payload: { ...item, price: newPrice } };

    const result = itemsReducer({ [item.id]: item }, action);

    expect(result[item.id].price).toBe(newPrice);
  });

  test("When REMOVE_ITEM, then remove existing item", () => {
    const item = getItemSample();

    const action = { type: REMOVE_ITEM, payload: { id: item.id } };

    const result = itemsReducer({ [item.id]: item }, action);

    expect(result[item.id]).toBeFalsy();
  });
});

describe("Action creators", () => {
  test("When call doAddItem, then pass service call result to particular action", async () => {
    const itemsService = new ItemsService();
    const store = mockStore({ services: { itemsService } });
    const item = getItemSample();
    jest.spyOn(itemsService, "addItem").mockResolvedValueOnce(item);
    const expectedActions = [{ type: ADD_ITEM, payload: item }];

    await store.dispatch(doAddItem(item));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("When call doRemoveItem, then call particular action", async () => {
    const itemId = "11";
    const store = mockStore({ services: { itemsService: new ItemsService() } });
    const expectedActions = [{ type: REMOVE_ITEM, payload: { id: itemId } }];

    await store.dispatch(doRemoveItem(itemId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("When call doUpdateItem, then pass service call result to particular action", async () => {
    const itemsService = new ItemsService();
    const store = mockStore({ services: { itemsService } });
    const item = getItemSample();
    jest.spyOn(itemsService, "updateItem").mockResolvedValueOnce(item);
    const expectedActions = [{ type: UPDATE_ITEM, payload: item }];

    await store.dispatch(doUpdateItem(item));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
