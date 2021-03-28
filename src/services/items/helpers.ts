// TODO add types
// @ts-ignore
import Dinero from "dinero.js";
import { NewItemDTO } from "./types";

export const MIN_TITLE = 20;
export const MAX_TITLE = 60;
export const MAX_DESCRIPTION = 200;
export const MIN_PRICE = 100;
export const MAX_PRICE = 9999999999;
export const MAX_IMAGE_WIDTH = 4000;
export const MAX_IMAGE_HEIGHT = 4000;
export const MIN_IMAGE_WIDTH = 200;
export const MIN_IMAGE_HEIGHT = 200;
export const MIN_DISCOUNT = 10;
export const MAX_DISCOUNT = 90;

export function isTitleValid(title: string): boolean {
  return title.length >= MIN_TITLE && title.length <= MAX_TITLE;
}

export function isDescriptionValid(description: string): boolean {
  return description.length <= MAX_DESCRIPTION;
}

export function isPriceValid(price: number): boolean {
  return price >= MIN_PRICE && price <= MAX_PRICE;
}

export function isDiscountValid(discount: number): boolean {
  return discount >= MIN_DISCOUNT && discount <= MAX_DISCOUNT;
}

export function isDiscountExpireAtValid(expireAt: number): boolean {
  return expireAt > Date.now();
}

export function convertPrice(price: number): string {
  if (!price) return "";
  return Dinero({ amount: price, precision: 2 }).toFormat("0.00");
}
// TODO add tests
export function calculateNewPrice(price: number, discount: number): string {
  if (!price || !discount) return "";

  const priceObj = Dinero({ amount: price, precision: 2 });
  const percentageObj = Dinero({ amount: price, precision: 2 }).percentage(
    discount
  );

  return priceObj.subtract(percentageObj).toFormat("0.00");
}
