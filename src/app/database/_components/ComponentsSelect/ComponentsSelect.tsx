import Image from "next/image";
import * as SC from "./ComponentsSelect.style";
import { FC } from "react";
import { dataState } from "../../../../../redux/dataSlice/dataSlice";
import { FnTd, TdButton } from "../DataTables/DataTable.style";
import { useAppSelector } from "../../../../../redux/storeHooks";
import { CalculateTotalCost, convertToCost } from "@/app/globalFcns";
import { Input } from "../TableEditors/TableEditors.style";
import { constrainedMemory } from "process";

interface ComponentSelectProps {
  setComponents: (
    choosedComponents: dataState["specifications"][0]["components"]
  ) => void;
  departmentFilter: number;
  choosedComponents: dataState["specifications"][0]["components"];
}

const ComponentsSelect: FC<ComponentSelectProps> = ({
  departmentFilter,
  choosedComponents,
  setComponents,
}) => {
  const components = useAppSelector(
    (state) => state.dataSlice.components
  ).filter((comp) => +comp.department_id === +departmentFilter);

  const onClickDelete = (i: number) =>
    setComponents(choosedComponents.filter((comp, index) => index !== i));

  const onClickAdd = (id: number) =>
    setComponents([...choosedComponents, { id: +id, quantity: 1 }]);

  const changeQuantity = (i: number, quantity: number) =>
    setComponents(
      choosedComponents.map((el, index) =>
        index === i ? { ...el, quantity: quantity === 0 ? 1 : +quantity } : el
      )
    );

  return (
    <SC.ComponentsSelectContainer>
      <SC.ComponentsTable>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Цена</th>
            <th>Количество</th>
          </tr>
        </thead>
        <tbody>
          {choosedComponents.length
            ? choosedComponents.map((el, i) => {
                const currentComponent = components.filter(
                  (comp) => +el.id === comp.id
                )[0];
                return currentComponent ? (
                  <tr>
                    <td>{currentComponent.name}</td>
                    <td>{currentComponent.description}</td>
                    <td>{`${convertToCost(currentComponent.cost)}`}</td>
                    <td style={{ width: "10%" }}>
                      <Input
                        name="quantity"
                        required
                        value={el.quantity}
                        type="number"
                        onChange={(e) => changeQuantity(i, +e.target.value)}
                      />
                    </td>
                    <FnTd>
                      <TdButton type="button" onClick={() => onClickDelete(i)}>
                        <Image
                          src={"/images/delete.svg"}
                          alt={"delete"}
                          width={20}
                          height={20}
                        />
                      </TdButton>
                    </FnTd>
                  </tr>
                ) : null;
              })
            : null}
        </tbody>
      </SC.ComponentsTable>
      <SC.ButtonAndCost>
        <SC.AvaliableComponentsContainer>
          {components
            .filter(
              (el) =>
                !choosedComponents.some((choosed) => +choosed.id === el.id)
            )
            .map((comp) => (
              <SC.ComponentChip
                key={`component_chip_${comp.id}`}
                value={comp.id}
                onClick={() => onClickAdd(comp.id)}
                type="button"
              >
                {comp.name}
              </SC.ComponentChip>
            ))}
        </SC.AvaliableComponentsContainer>
        Общая цена: {CalculateTotalCost(choosedComponents, components)}
      </SC.ButtonAndCost>
    </SC.ComponentsSelectContainer>
  );
};

export default ComponentsSelect;
