import { getImageDimensionsByUrl } from "src/utils";
// TODO change this
// @ts-ignore
import Dinero from "dinero.js";

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

function isTitleValid(title: string): boolean {
  if (typeof title !== "string") return false;
  return title.length >= MIN_TITLE && title.length <= MAX_TITLE;
}

function isDescriptionValid(description: string): boolean {
  return (
    typeof description === "string" && description.length <= MAX_DESCRIPTION
  );
}

function isPriceValid(price: string): boolean {
  if (!/^\d+(\.\d{0,2})?$/.test(price)) return false;
  const normalizedPrice = parseFloat(price) * 100;

  return normalizedPrice >= MIN_PRICE && normalizedPrice <= MAX_PRICE;
}

async function isImageUrlValid(url: string): Promise<boolean> {
  try {
    const { width, height } = await getImageDimensionsByUrl(url);
    return (
      width >= MIN_IMAGE_WIDTH &&
      height >= MIN_IMAGE_HEIGHT &&
      width <= MAX_IMAGE_WIDTH &&
      height <= MAX_IMAGE_HEIGHT
    );
  } catch (e) {
    return false;
  }
}

function isDiscountValid(discount: string): boolean {
  return (
    /^\d*$/.test(discount) &&
    parseInt(discount) >= MIN_DISCOUNT &&
    parseInt(discount) <= MAX_DISCOUNT
  );
}

function isDiscountExpireAtValid(expireAt: number): boolean {
  return expireAt > Date.now();
}

export async function validateItem({
  title = "",
  description = "",
  price = "",
  image = "",
  discount = "",
  discountExpireAt = 0,
}) {
  // TODO create smth more beauty
  const errors: {
    title?: string;
    description?: string;
    price?: string;
    image?: string;
    discount?: string;
    discountExpireAt?: string;
  } = {};

  const trimmedTitle = title.toString().trim();
  const trimmedDescription = description.toString().trim();
  const trimmedPrice = price.toString().trim();
  const trimmedImage = image.toString().trim();
  const trimmedDiscount = discount.toString().trim();

  if (!trimmedTitle || !isTitleValid(trimmedTitle)) {
    errors.title = "Invalid title";
  }

  if (trimmedDescription && !isDescriptionValid(trimmedDescription)) {
    errors.description = "Invalid description";
  }

  if (!trimmedPrice) {
    errors.price = "Price required";
  } else if (!isPriceValid(trimmedPrice)) {
    errors.price = "Invalid price";
  }

  if (!trimmedImage) {
    errors.image = "Image required";
  } else {
    const isImgValid = await isImageUrlValid(trimmedImage);

    if (!isImgValid) {
      errors.image = "Image invalid";
    }
  }

  if (trimmedPrice && trimmedDiscount && !isDiscountValid(trimmedDiscount)) {
    errors.discount = "Invalid discount";
  }

  if (
    trimmedPrice &&
    trimmedDiscount &&
    !isDiscountExpireAtValid(discountExpireAt)
  ) {
    errors.discountExpireAt = "Invalid end of discount";
  }

  return errors;
}

export function convertPrice(price: number): string {
  if (!price || typeof price !== "number") return "";
  return Dinero({ amount: price, precision: 2 }).toFormat("0.00");
}
// TODO add tests
export function calculateNewPrice(price: number, discount: number): string {
  if (
    !price ||
    typeof price !== "number" ||
    !discount ||
    typeof discount !== "number"
  )
    return "";

  const priceObj = Dinero({ amount: price, precision: 2 });
  const percentageObj = Dinero({ amount: price, precision: 2 }).percentage(
    discount
  );

  return priceObj.subtract(percentageObj).toFormat("0.00");
}
