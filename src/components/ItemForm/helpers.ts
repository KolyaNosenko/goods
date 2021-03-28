import { getImageDimensionsByUrl } from "src/utils";
import {
  MAX_DISCOUNT,
  MAX_IMAGE_HEIGHT,
  MIN_IMAGE_HEIGHT,
  MIN_IMAGE_WIDTH,
  MAX_DESCRIPTION,
  MAX_IMAGE_WIDTH,
  MAX_PRICE,
  MAX_TITLE,
  MIN_DISCOUNT,
  MIN_PRICE,
  MIN_TITLE,
} from "src/services/items";

function isTitleValid(title: string): boolean {
  return title.length >= MIN_TITLE && title.length <= MAX_TITLE;
}

function isDescriptionValid(description: string): boolean {
  return description.length <= MAX_DESCRIPTION;
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
