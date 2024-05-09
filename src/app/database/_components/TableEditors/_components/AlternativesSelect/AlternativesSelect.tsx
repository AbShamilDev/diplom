import { AltenativesBlock, NoMarginSelect } from "../../TableEditors.style";
import { ChangeEvent, FC } from "react";
import { useAppSelector } from "@/redux/storeHooks";
import {
  AvaliableComponentsContainer,
  ComponentChip,
  ComponentCost,
  ComponentName,
} from "../ComponentsSelect/ComponentsSelect.style";
import { convertToCost } from "@/app/globalFcns";
import Image from "next/image";

interface Props {
  onChange: (ev: ChangeEvent<HTMLSelectElement>) => void;
  onDelete: (id: number) => void;
  department_id: number;
  alternatives: number[];
}

const AlternativesSelect: FC<Props> = ({
  onChange,
  onDelete,
  department_id,
  alternatives,
}) => {
  const components = useAppSelector((state) => state.dataSlice.components);
  const editId = useAppSelector((state) => state.editSlice.editId);

  return (
    <AltenativesBlock>
      <NoMarginSelect name="alternatives" onChange={onChange}>
        <option value="">
          {!department_id ? "Выберите отдел" : "Выбертите альтернативы"}
        </option>
        {components
          .filter(
            (comp) =>
              comp.department_id === +department_id &&
              (!editId || editId !== comp.id) &&
              !alternatives.some((id) => id === comp.id)
          )
          .map((el) => (
            <option key={el.name} value={el.id}>
              {el.name}
            </option>
          ))}
      </NoMarginSelect>
      <AvaliableComponentsContainer style={{ width: "100%" }}>
        {alternatives.map((altId) => {
          const component = components.filter((comp) => comp.id === altId)[0];
          return (
            <ComponentChip type="button" onClick={() => onDelete(altId)}>
              <ComponentName>{component.name}</ComponentName>
              <ComponentCost>
                {convertToCost(component.cost)}
                <Image
                  src="/images/delete.svg"
                  width={20}
                  height={20}
                  alt="delete"
                />
              </ComponentCost>
            </ComponentChip>
          );
        })}
      </AvaliableComponentsContainer>
    </AltenativesBlock>
  );
};

export default AlternativesSelect;
