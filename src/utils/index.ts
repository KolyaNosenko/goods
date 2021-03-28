import isEqual from "lodash/isEqual";
import transform from "lodash/transform";
import isObject from "lodash/isObject";
import dayjs from "dayjs";
import { NewItem } from "../types";
import { NewItemDTO } from "../services/items";

export function getImageDimensionsByUrl(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const imageTag = document.createElement("img");
    imageTag.onload = () => {
      resolve({
        width: imageTag.width,
        height: imageTag.height,
      });
    };
    imageTag.onerror = (error) => {
      reject(error);
    };
    imageTag.src = url;
  });
}

export function isDevelopmentMode() {
  return process.env.NODE_ENV === "development";
}

export async function objectUrlToBlob(url: string): Promise<Blob> {
  return fetch(url).then((r) => r.blob());
}

export function getDifferenceBetweenObjects(object: any, base: any) {
  return transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      // TODO fix
      // @ts-ignore
      result[key] =
        isObject(value) && isObject(base[key])
          ? getDifferenceBetweenObjects(value, base[key])
          : value;
    }
  });
}

export function formatDate(date: string | number, format = "DD MMM") {
  return dayjs(date).format(format);
}

function normalizePrice(price = "") {
  const val = parseFloat(price.trim()) * 100;
  return Number.isNaN(val) ? 0 : val;
}

function normalizeDiscount(discount = "") {
  const val = parseInt(discount.trim());
  return Number.isNaN(val) ? 0 : val;
}

export function normalizeItem({
  title = "",
  description = "",
  price = "",
  image = "",
  discount = "",
  discountExpireAt = 0,
}: NewItem): NewItemDTO {
  const normalizedTitle = title.trim();
  const normalizedDescription = description.trim();
  const normalizedPrice = normalizePrice(price);
  const normalizedImage = image.trim();
  const normalizedDiscount = normalizeDiscount(discount);

  return {
    title: normalizedTitle,
    description: normalizedDescription,
    price: normalizedPrice,
    image: normalizedImage,
    discount: normalizedDiscount,
    discountExpireAt:
      normalizedDiscount && normalizedDiscount > 0 ? discountExpireAt : 0,
  };
}
