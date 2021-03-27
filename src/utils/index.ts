import isEqual from "lodash/isEqual";
import transform from "lodash/transform";
import isObject from "lodash/isObject";
import dayjs from "dayjs";

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
