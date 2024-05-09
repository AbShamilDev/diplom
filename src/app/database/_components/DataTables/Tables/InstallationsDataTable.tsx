import DataTableTemplate from "../DataTableTemplate";
import TabHeader from "./TableHeader/TableHeader";
import * as SC from "../DataTable.style";
import { dataState } from "@/redux/dataSlice/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { FC } from "react";
import { setEditId } from "@/redux/editDbSlice/editDbSlice";
import TdButton from "../_components/TdButton";
import { CalculateTotalCost, convertToCost } from "@/app/globalFcns";

interface ItemsProps {
  items: dataState["installations"];
}

const InstallationsDataTable: FC<ItemsProps> = ({ items }) => {
  const { editId } = useAppSelector((state) => state.editSlice);
  const { specifications, components } = useAppSelector(
    (state) => state.dataSlice
  );
  const dispatch = useAppDispatch();

  const onClickEdit = (id: number) => {
    editId ? dispatch(setEditId(null)) : dispatch(setEditId(id));
  };

  const CalculateInstallation = (item: dataState["installations"][0]) => {
    const choosedSpecifications = {
      first: specifications.filter(
        (el) => el.id === item.fst_specification_id
      )[0],
      second: specifications.filter(
        (el) => el.id === item.snd_specification_id
      )[0],
      third: specifications.filter(
        (el) => el.id === item.trd_specification_id
      )[0],
    };

    return (
      <>
        <td>{choosedSpecifications.first.name}</td>
        <td>{choosedSpecifications.second.name}</td>
        <td>{choosedSpecifications.third.name}</td>
        <td>
          {convertToCost(
            CalculateTotalCost(
              choosedSpecifications.first.components,
              components
            ) +
              CalculateTotalCost(
                choosedSpecifications.second.components,
                components
              ) +
              CalculateTotalCost(
                choosedSpecifications.third.components,
                components
              )
          )}
        </td>
      </>
    );
  };

  return (
    <>
      <TabHeader items={items} />
      <DataTableTemplate>
        <SC.ItemsTable>
          <thead>
            <tr>
              <SC.TableHead rowSpan={2}>Имя</SC.TableHead>
              <SC.TableHead colSpan={3}>Спецификации</SC.TableHead>
              <SC.TableHead rowSpan={2}>Фин. стоимость</SC.TableHead>
            </tr>
            <tr>
              <SC.TableHead>АСУТП</SC.TableHead>
              <SC.TableHead>Гидравлика</SC.TableHead>
              <SC.TableHead>Блоки питания</SC.TableHead>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={`${item.id}_${item.name}`}
                style={{
                  zIndex: editId === item.id ? 100 : 0,
                }}
              >
                <td>{item.name}</td>
                {CalculateInstallation(item)}
                <TdButton onClickEdit={() => onClickEdit(item.id)} />
              </tr>
            ))}
          </tbody>
        </SC.ItemsTable>
      </DataTableTemplate>
    </>
  );
};

export default InstallationsDataTable;
