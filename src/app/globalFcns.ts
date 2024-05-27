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
  return componentsQnt.reduce(
    (acc, cur) =>
      acc +
      components.filter((component) => component.id === +cur.id)[0]?.cost *
        +cur.quantity,
    0
  );
};

export const CalculateInstallation = (
  installation: dataState["installations"][0],
  specifications: dataState["specifications"],
  components: dataState["components"]
) => {
  const fst_cost = specifications
    .filter((spec) => spec.id === installation.fst_specification_id)[0]
    .components.reduce(
      (acc, cur) =>
        acc + components.filter((comp) => comp.id === +cur.id)[0].cost,
      0
    );
  const snd_cost = specifications
    .filter((spec) => spec.id === installation.snd_specification_id)[0]
    .components.reduce(
      (acc, cur) =>
        acc + components.filter((comp) => comp.id === +cur.id)[0].cost,
      0
    );
  const trd_cost = specifications
    .filter((spec) => spec.id === installation.trd_specification_id)[0]
    .components.reduce(
      (acc, cur) =>
        acc + components.filter((comp) => comp.id === +cur.id)[0].cost,
      0
    );

  return (
    fst_cost + snd_cost + (installation.two_lines ? trd_cost * 2 : trd_cost)
  );
};
