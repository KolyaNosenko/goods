import { NewItem, UpdateItem } from "src/types";

export const EMAIL = "email@mailto.com";
export const ID = "-MT7E8PBs017qAfnCN3l";
export const IMAGE_URL = "https://firebasestorage.googleapis.com/v0/b/cr-...";
export const PASSWORD = "123123123";
export const ITEM_TITLE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
export const ITEM_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export function getNewItemMock(item: Partial<NewItem> = {}): NewItem {
  return {
    title: ITEM_TITLE,
    description: ITEM_DESCRIPTION,
    price: "10",
    image: IMAGE_URL,
    discount: "",
    discountExpireAt: 0,
    ...item,
  };
}

export function getUpdateItemMock(item: Partial<UpdateItem> = {}): UpdateItem {
  return {
    id: item.id || ID,
    ...getNewItemMock(item),
  };
}

export function getItemMock(data = {}) {
  return {
    description: ITEM_DESCRIPTION,
    discount: 10,
    discountExpireAt: 1652911162570,
    id: ID,
    image: IMAGE_URL,
    price: 100,
    title: ITEM_TITLE,
    updatedAt: 1652911162570,
    ...data,
  };
}
