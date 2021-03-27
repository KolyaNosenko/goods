import {
  calculateNewPrice,
  convertPrice,
  ItemDTO,
  NewItem,
  UpdateItem,
} from "../services/items";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { StoreState, ThunkedAction } from "./types";

export interface Item extends Omit<ItemDTO, "price"> {
  price: string;
  newPrice: string;
}

export const getItem = (state: StoreState, itemId: string): Item => {
  const item = state.items[itemId];

  return {
    ...item,
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

export const removeItem = createAction("items/REMOVE_ITEM", (id) => {
  return {
    payload: {
      id,
    },
  };
});

export const setItems = createAction<Array<ItemDTO>>("items/SET_ITEMS");

export type ItemsActions =
  | ReturnType<typeof addItem>
  | ReturnType<typeof updateItem>
  | ReturnType<typeof removeItem>
  | ReturnType<typeof setItems>;

export const doAddItem = (item: NewItem): ThunkedAction => {
  return async function (dispatch, getState) {
    const { itemsService } = getState().services;
    const addedItem = await itemsService.addItem(item);

    return dispatch(addItem(addedItem));
  };
};

export function doRemoveItem(itemId: string): ThunkedAction {
  return async function (dispatch, getState) {
    const { itemsService } = getState().services;
    await itemsService.removeItem(itemId);

    return dispatch(removeItem(itemId));
  };
}

export function doUpdateItem(item: UpdateItem): ThunkedAction {
  return async function (dispatch, getState) {
    const { itemsService } = getState().services;
    const updatedItem = await itemsService.updateItem(item);

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
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload,
        },
      };
    })
    .addCase(updateItem, (state, { payload }) => {
      // TODO think about this
      if (!payload.id) return state;

      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload,
        },
      };
    })
    .addCase(removeItem, (state, { payload }) => {
      const { [payload.id]: removedItem, ...newState } = state;
      return newState;
    })
    .addCase(setItems, (state, { payload }) => {
      return payload.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
    });
});
