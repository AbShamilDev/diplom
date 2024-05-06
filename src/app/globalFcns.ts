import { dataState } from "..";

export const convertToCost = (num: number) =>
  num.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });

export const CalculateTotalCost = (
  componentsQnt: dataState["specifications"][0]["components"],
  components: dataState["components"]
) => {
  return convertToCost(
    componentsQnt.reduce(
      (acc, cur) =>
        acc +
        components.filter((component) => component.id === +cur.id)[0]?.cost *
          +cur.quantity,
      0
    )
  );
};
