import { validateItem } from "./helpers";
import { getNewItemDTO } from "../../tests-utils";

describe("validateItem", () => {
  test("When title too short, then return false", () => {
    const title = "T";
    const item = getNewItemDTO({ title });
    const result = validateItem(item);

    expect(result).toBeFalsy();
  });

  test("When title too long, then return false", () => {
    const title = new Array(250).fill("1").join("");
    const item = getNewItemDTO({ title });
    const result = validateItem(item);

    expect(result).toBeFalsy();
  });

  test("When pass normal title, then return true", () => {
    const title = new Array(20).fill("1").join("");
    const item = getNewItemDTO({ title });
    const result = validateItem(item);

    expect(result).toBeTruthy();
  });

  test("When description too long, then return false", () => {
    const description = new Array(500).fill("1").join("");
    const item = getNewItemDTO({ description });
    const result = validateItem(item);

    expect(result).toBeFalsy();
  });

  test("When description normal, then return true", () => {
    const description = new Array(15).fill("1").join("");
    const item = getNewItemDTO({ description });
    const result = validateItem(item);

    expect(result).toBeTruthy();
  });
  // TODO add more tests
  test("When price too low, then return false", () => {
    const price = 1;
    const item = getNewItemDTO({ price });
    const result = validateItem(item);

    expect(result).toBeFalsy();
  });

  test("When price too huge, then return false", () => {
    const price = 10000000000;
    const item = getNewItemDTO({ price });
    const result = validateItem(item);

    expect(result).toBeFalsy();
  });

  test("When price normal, then return true", () => {
    const price = 1000;
    const item = getNewItemDTO({ price });
    const result = validateItem(item);

    expect(result).toBeTruthy();
  });

  test("When discount too low, then return false", () => {
    const discount = 0.1;
    const item = getNewItemDTO({ discount });
    const result = validateItem(item);

    expect(result).toBeFalsy();
  });

  test("When discount too huge, then return false", () => {
    const discount = 150;
    const item = getNewItemDTO({ discount });
    const result = validateItem(item);

    expect(result).toBeFalsy();
  });

  test("When discount normal, then return true", () => {
    const discount = 15;
    const item = getNewItemDTO({ discount });
    const result = validateItem(item);

    expect(result).toBeTruthy();
  });

  test("When discountExpireAt in past and discount set, then return false", () => {
    const oldDate = 2;
    const currentDate = 5;
    const item = getNewItemDTO({ discountExpireAt: oldDate });
    jest.spyOn(Date, "now").mockImplementationOnce(() => currentDate);

    const result = validateItem(item);

    expect(result).toBeFalsy();
  });

  test("When discountExpireAt in future, then return true", () => {
    const futureDate = 8;
    const currentDate = 5;
    const item = getNewItemDTO({ discountExpireAt: futureDate });
    jest.spyOn(Date, "now").mockImplementationOnce(() => currentDate);

    const result = validateItem(item);

    expect(result).toBeTruthy();
  });
});
