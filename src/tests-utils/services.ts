import { ItemDTO } from "src/services/items";
import { UserDTO } from "src/services/user";
import { EMAIL, ID } from "./misc";

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
