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
  alternatives: number[];
}

const AlternativesSelect: FC<Props> = ({
  onChange,
  onDelete,
  alternatives,
}) => {
  const components = useAppSelector((state) => state.dataSlice.components);
  const { editId, departmentFilter } = useAppSelector(
    (state) => state.editSlice
  );

  return (
    <AltenativesBlock>
      <NoMarginSelect name="alternatives" onChange={onChange}>
        <option value="">Выбертите альтернативы</option>
        {components
          .filter(
            (comp) =>
              comp.department_id === +departmentFilter &&
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
          const component = components.filter((comp) => +comp.id === +altId)[0];
          console.log(alternatives, components);
          return (
            <ComponentChip
              key={`alternative_chip_${altId}`}
              type="button"
              onClick={() => onDelete(altId)}
            >
              <ComponentName>{component.name}</ComponentName>
              <ComponentCost>
                {convertToCost(component.cost)}
                <Image
                  src="/images/delete_white.svg"
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
