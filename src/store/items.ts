import { calculateNewPrice, convertPrice, ItemDTO } from "src/services/items";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { StoreState, ThunkedAction } from "./types";
import { normalizeItem } from "src/utils";
import { NewItem, UpdateItem } from "src/types";

export interface Item extends Omit<ItemDTO, "price" | "discount"> {
  price: string;
  newPrice: string;
  discount: string;
}

export const getItem = (state: StoreState, itemId: string): Item => {
  const item = state.items[itemId];

  return {
    ...item,
    discount: item.discount ? item.discount.toString() : "",
    price: convertPrice(item.price),
    newPrice: calculateNewPrice(item.price, item.discount || 0),
  };
};

export const getItems = (state: StoreState) => {
  if (!state.items) return [];

  return Object.values(state.items).map((item) => getItem(state, item.id));
};

export const getSortedItems = (state: StoreState) => {
  const items = getItems(state);
  return items.sort((a, b) => b.updatedAt - a.updatedAt);
};

export const addItem = createAction<ItemDTO>("items/ADD_ITEM");

export const updateItem = createAction<Partial<ItemDTO>>("items/UPDATE_ITEM");

export const removeItem = createAction("items/REMOVE_ITEM", (id: string) => {
  return { payload: { id } };
});

export const setItems = createAction<Array<ItemDTO>>("items/SET_ITEMS");

export type ItemsActions =
  | ReturnType<typeof addItem>
  | ReturnType<typeof updateItem>
  | ReturnType<typeof removeItem>
  | ReturnType<typeof setItems>;

export const doAddItem = (item: NewItem): ThunkedAction => {
  return async function (dispatch, getState, context) {
    const { itemsService } = context;
    const normalizedItem = normalizeItem(item);
    const addedItem = await itemsService.addItem(normalizedItem);
    return dispatch(addItem(addedItem));
  };
};

export function doRemoveItem(itemId: string): ThunkedAction {
  return async function (dispatch, getState, context) {
    const { itemsService } = context;
    await itemsService.removeItem(itemId);

    return dispatch(removeItem(itemId));
  };
}

export function doUpdateItem(item: UpdateItem): ThunkedAction {
  return async function (dispatch, getState, context) {
    const { itemsService } = context;
    const normalizedItem = normalizeItem(item);
    const updatedItem = await itemsService.updateItem({
      ...normalizedItem,
      id: item.id,
    });

    return dispatch(updateItem(updatedItem));
  };
}

export type ItemsState = {
  [id: string]: ItemDTO;
};

const initialState: ItemsState = {};

export const itemsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addItem, (state, { payload }) => {
      state[payload.id] = payload;
    })
    .addCase(updateItem, (state, { payload }) => {
      if (!payload.id || !state[payload.id]) return state;

      state[payload.id] = {
        ...state[payload.id],
        ...payload,
      };
    })
    .addCase(removeItem, (state, { payload }) => {
      delete state[payload.id];
    })
    .addCase(setItems, (state, { payload }) => {
      return payload.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
    });
});
