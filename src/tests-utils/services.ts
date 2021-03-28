import { ItemDTO, NewItemDTO } from "src/services/items";
import { UserDTO } from "src/services/user";
import { EMAIL, ID, IMAGE_URL } from "./misc";

export function getItemDTO(options: Partial<ItemDTO> = {}): ItemDTO {
  return {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    discount: 10,
    discountExpireAt: 1652911162570,
    id: ID,
    image: IMAGE_URL,
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

export function getNewItemDTO(options: Partial<NewItemDTO> = {}): NewItemDTO {
  return {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    price: 1000,
    image: IMAGE_URL,
    discount: 15,
    discountExpireAt: Number.MAX_VALUE,
    ...options,
  };
}
