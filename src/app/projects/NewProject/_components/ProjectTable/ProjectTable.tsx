import { TableHead } from "@/app/database/_components/DataTables/DataTable.style";
import { ChangeEvent, FC } from "react";
import { ComponentWithQuantity } from "../../NewProject";
import * as SC from "./ProjectTable.style";
import { NoMarginSelect } from "@/app/database/_components/TableEditors/TableEditors.style";
import { useAppSelector } from "@/redux/storeHooks";
import { ComponentsTable } from "@/app/database/_components/TableEditors/_components/ComponentsSelect/ComponentsSelect.style";
import { convertToCost } from "@/app/globalFcns";
import { HelperText } from "../Сriteria/Сriteria.style";

interface Props {
  spec_components: ComponentWithQuantity[] | undefined;
  name: string;
  onSelectAlternative: (
    ev: ChangeEvent<HTMLSelectElement>,
    oldId: number,
    newId: number
  ) => void;
}

const ProjectTable: FC<Props> = ({
  spec_components,
  name,
  onSelectAlternative,
}) => {
  const { components } = useAppSelector((state) => state.dataSlice);

  return spec_components ? (
    <>
      <HelperText style={{ fontWeight: "500" }}>
        {name === "fst_spec"
          ? 'Для "АСУТП"'
          : name === "snd_spec"
          ? 'Для "Гидравлика"'
          : 'Для "Блоки питания"'}
      </HelperText>
      <ComponentsTable
        style={{
          margin: "10px 0 40px 50px",
          border: "1px solid #0003",
        }}
      >
        <thead>
          <tr>
            <TableHead>Имя</TableHead>
            <TableHead>Количество</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Альтернативы</TableHead>
          </tr>
        </thead>
        <tbody>
          {spec_components?.map((el) => (
            <tr key={`component_${el.id}`}>
              <SC.CustomTd>{el.name}</SC.CustomTd>
              <SC.CustomTd>{el.quantity}</SC.CustomTd>
              <SC.CustomTd>{convertToCost(el.cost)}</SC.CustomTd>
              <SC.CustomTd style={{ width: "20%" }}>
                {el.alternatives?.length ? (
                  <NoMarginSelect
                    style={{ width: "60%" }}
                    value=""
                    name={name}
                    onChange={(ev) =>
                      onSelectAlternative(ev, el.id, +ev.target.value)
                    }
                  >
                    <option value="">Выберите альтернативу</option>
                    {el.alternatives.map((altId) => {
                      const { id, name, cost } = components.filter(
                        (comp) => comp.id === +altId
                      )[0];
                      return (
                        <option
                          key={`alternative_${el.id}`}
                          value={id}
                        >{`${name} | ${convertToCost(cost)}`}</option>
                      );
                    })}
                  </NoMarginSelect>
                ) : (
                  "Нет альтернатив"
                )}
              </SC.CustomTd>
            </tr>
          ))}
        </tbody>
      </ComponentsTable>
    </>
  ) : null;
};

export default ProjectTable;
