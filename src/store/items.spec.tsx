import {
  setItems,
  addItem,
  updateItem,
  removeItem,
  doAddItem,
  doRemoveItem,
  doUpdateItem,
  getItem,
  getSortedItems,
  itemsReducer,
} from "./items";
import {
  getItemDTO,
  TestableItemsService,
  getStoreStateMock,
  createStore,
  createStoreContext, getNewItemDTO, getNewItemMock, getUpdateItemMock
} from "src/tests-utils";

describe("Selectors", () => {
  describe("getItem", () => {
    // TODO add more tests
    test("When item with price, then return item with float price", () => {
      const item = getItemDTO({ price: 100 });
      const state = getStoreStateMock({ items: { [item.id]: item } });

      const result = getItem(state, item.id);

      expect(result.price).toBe("1.00");
    });

    test("When item have discount, then return  float newPrice base on discount", () => {
      const item = getItemDTO({ price: 100, discount: 10 });
      const state = getStoreStateMock({ items: { [item.id]: item } });

      const result = getItem(state, item.id);

      expect(result.newPrice).toBe("0.90");
    });

    test("When item not have discount, then return 0 newPrice", () => {
      const item = getItemDTO({ price: 100, discount: 0 });
      const state = getStoreStateMock({ items: { [item.id]: item } });

      const result = getItem(state, item.id);

      expect(result.newPrice).toBeFalsy();
    });
  });

  describe("getSortedItems", () => {
    test("When state has items, then return sorted array by updatedAt", () => {
      const item1 = getItemDTO({ id: "1", updatedAt: 1 });
      const item2 = getItemDTO({ id: "2", updatedAt: 2 });
      const state = getStoreStateMock({
        items: { [item1.id]: item1, [item2.id]: item2 },
      });
      const result = getSortedItems(state);

      expect(result[0].id).toBe(item2.id);
      expect(result[1].id).toBe(item1.id);
    });

    test("When state empty, then return empty array", () => {
      const state = getStoreStateMock({
        items: {},
      });
      const result = getSortedItems(state);

      expect(result).toEqual(expect.any(Array));
    });
  });
});

describe("Reducer", () => {
  test("When call setItems, then set items map to state", () => {
    const item1 = getItemDTO();
    const item2 = getItemDTO();
    const items = [item1, item2];

    const action = setItems(items);

    const result = itemsReducer({}, action);

    expect(result[item1.id]).toEqual(item1);
    expect(result[item2.id]).toEqual(item2);
  });

  test("When call addItem, then add new item to state", () => {
    const item = getItemDTO();
    const action = addItem(item);

    const result = itemsReducer({}, action);

    expect(result[item.id]).toEqual(item);
  });

  test("When call updateItem, then update exist item", () => {
    const item = getItemDTO({ price: 10 });
    const newPrice = 20;
    const action = updateItem({ ...item, price: newPrice });

    const result = itemsReducer({ [item.id]: item }, action);

    expect(result[item.id].price).toBe(newPrice);
  });

  test("When call removeItem, then remove existing item", () => {
    const item = getItemDTO();
    const action = removeItem(item.id);

    const result = itemsReducer({ [item.id]: item }, action);

    expect(result[item.id]).toBeFalsy();
  });
});

describe("Action creators", () => {
  test("When call doAddItem, then pass service call result to particular action", async () => {
    const itemsService = new TestableItemsService();
    const store = createStore({
      context: createStoreContext({ itemsService }),
    });
    const newItem = getNewItemMock();
    const item = getItemDTO();
    jest.spyOn(itemsService, "addItem").mockResolvedValueOnce(item);
    const expectedActions = [addItem(item)];

    await store.dispatch(doAddItem(newItem));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("When call doRemoveItem, then call particular action", async () => {
    const itemId = "11";
    const store = createStore();
    const expectedActions = [removeItem(itemId)];

    await store.dispatch(doRemoveItem(itemId));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("When call doUpdateItem, then pass service call result to particular action", async () => {
    const itemsService = new TestableItemsService();
    const store = createStore({
      context: createStoreContext({ itemsService }),
    });
    const itemForUpdate = getUpdateItemMock();
    const item = getItemDTO();
    jest.spyOn(itemsService, "updateItem").mockResolvedValueOnce(item);
    const expectedActions = [updateItem(item)];

    await store.dispatch(doUpdateItem(itemForUpdate));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
