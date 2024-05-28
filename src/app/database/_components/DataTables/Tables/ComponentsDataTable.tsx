import { FC } from "react";
import * as SC from "../DataTable.style";
import DataTableTemplate from "../DataTableTemplate";
import TdButton from "../_components/TdButton";
import { convertToCost } from "@/app/globalFcns";
import { dataState } from "@/redux/dataSlice/dataSlice";
import { setEditId } from "@/redux/editDbSlice/editDbSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import TabHeader from "./TableHeader/TableHeader";

interface ItemsProps {
  items: dataState["components"];
}

const ComponentsDataTable: FC<ItemsProps> = ({ items }) => {
  const { editId, departmentFilter } = useAppSelector(
    (state) => state.editSlice
  );
  const { units } = useAppSelector((state) => state.dataSlice);
  const dispatch = useAppDispatch();

  const onClickEdit = (id: number) => {
    editId ? dispatch(setEditId(null)) : dispatch(setEditId(id));
  };
  console.log(departmentFilter);
  return (
    <>
      <TabHeader items={items} />
      <DataTableTemplate>
        <SC.ItemsTable>
          <thead>
            <tr>
              <SC.TableHead>Имя</SC.TableHead>
              <SC.TableHead>Описание</SC.TableHead>
              <SC.TableHead>Цена</SC.TableHead>
              <SC.TableHead>ЕИ</SC.TableHead>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((el) => el.department_id === departmentFilter)
              .map((item) => (
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
                  <TdButton
                    onClickEdit={() => onClickEdit(item.id)}
                    linkEnable
                    link={item.link}
                  />
                </tr>
              ))}
          </tbody>
        </SC.ItemsTable>
      </DataTableTemplate>
    </>
  );
};

export default ComponentsDataTable;
