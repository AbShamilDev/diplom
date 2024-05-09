import DataTableTemplate from "../DataTableTemplate";
import TabHeader from "./TableHeader/TableHeader";
import * as SC from "../DataTable.style";
import { dataState } from "@/redux/dataSlice/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { FC } from "react";
import { setEditId } from "@/redux/editDbSlice/editDbSlice";
import TdButton from "../_components/TdButton";

interface ItemsProps {
  items: dataState["instalations"];
}

const InstallationsDataTable: FC<ItemsProps> = ({ items }) => {
  const { editId } = useAppSelector((state) => state.editSlice);
  const { departments, units } = useAppSelector((state) => state.dataSlice);
  const dispatch = useAppDispatch();

  const onClickEdit = (id: number) => {
    editId ? dispatch(setEditId(null)) : dispatch(setEditId(id));
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
