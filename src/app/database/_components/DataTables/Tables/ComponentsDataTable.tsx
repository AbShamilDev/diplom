import { FC } from "react";
import * as SC from "../DataTable.style";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../redux/storeHooks";
import { setEditId } from "../../../../../../redux/editDbSlice/editDbSlice";
import DataTableTemplate from "../DataTableTemplate";
import TdButtons from "../_components/TdButtons";
import {
  dataState,
  getComponents,
} from "../../../../../../redux/dataSlice/dataSlice";
import axiosApp from "../../../../../../axios";
import { convertToCost } from "@/app/globalFcns";

interface ItemsProps {
  items: dataState["components"];
}

const ComponentsDataTable: FC<ItemsProps> = ({ items }) => {
  const { editId } = useAppSelector((state) => state.editSlice);
  const { departments, units } = useAppSelector((state) => state.dataSlice);
  const dispatch = useAppDispatch();

  const onClickEdit = (id: number) => {
    editId ? dispatch(setEditId(null)) : dispatch(setEditId(id));
  };

  const onClickDelete = async (id: number) => {
    await axiosApp
      .delete("/components", { params: { id: id } })
      .then(() => dispatch(getComponents()));
  };

  return (
    <DataTableTemplate>
      <SC.ItemsTable>
        <thead>
          <tr>
            <SC.TableHead>Имя</SC.TableHead>
            <SC.TableHead>Описание</SC.TableHead>
            <SC.TableHead>Цена</SC.TableHead>
            <SC.TableHead>ЕИ</SC.TableHead>
            <SC.TableHead>Отдел</SC.TableHead>
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
              <td>{item.description}</td>
              <td>{convertToCost(item.cost)}</td>
              <td>{units[item.unit_id - 1].name}</td>
              <td>{departments[item.department_id - 1].name}</td>
              <TdButtons
                onClickDelete={() => {
                  onClickDelete(item.id);
                }}
                onClickEdit={() => onClickEdit(item.id)}
              />
            </tr>
          ))}
        </tbody>
      </SC.ItemsTable>
    </DataTableTemplate>
  );
};

export default ComponentsDataTable;
