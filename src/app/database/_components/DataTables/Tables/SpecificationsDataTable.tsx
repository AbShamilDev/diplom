import { FC, useEffect, useState } from "react";
import * as SC from "../DataTable.style";
import Image from "next/image";
import { CalculateTotalCost } from "@/app/globalFcns";
import TabHeader from "./TableHeader/TableHeader";
import { dataState } from "@/redux/dataSlice/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { setEditId } from "@/redux/editDbSlice/editDbSlice";
import TdButton from "../_components/TdButton";

interface Props {
  items: dataState["specifications"];
}

const SpecificationsDataTable: FC<Props> = ({ items }) => {
  const { departments, components } = useAppSelector(
    (state) => state.dataSlice
  );
  const { editId, departmentFilter } = useAppSelector(
    (state) => state.editSlice
  );
  const [filteredItems, setFilteredItems] = useState(
    items.filter((item) => item.department_id === departmentFilter)
  );
  const dispatch = useAppDispatch();

  const onClickEdit = (id: number) => {
    editId ? dispatch(setEditId(null)) : dispatch(setEditId(id));
  };

  const TotalQuantity = (
    components: dataState["specifications"][0]["components"]
  ) => {
    let result = 0;
    components.forEach((component) => {
      result += +component.quantity;
    });
    return result;
  };

  useEffect(() => {
    setFilteredItems(
      items.filter((item) => item.department_id === departmentFilter)
    );
  }, [departmentFilter, items]);

  return (
    <>
      <TabHeader items={filteredItems} showComponents />
      <SC.ScrollTableContainer>
        <div
          style={{
            display: editId !== null ? "block" : "none",
            position: "absolute",
            width: "100%",
            overflow: editId !== null ? "hidden" : "auto",
            height: "100%",
            background: "#fffb",
            zIndex: editId !== null ? 10 : 0,
          }}
        ></div>
        <SC.ItemsTable>
          <thead>
            <tr>
              <SC.TableHead rowSpan={2}>Имя</SC.TableHead>
              <SC.TableHead colSpan={2}>Компоненты</SC.TableHead>
              <SC.TableHead rowSpan={2}>Отдел</SC.TableHead>
            </tr>
            <tr>
              <SC.TableHead>Общее количество</SC.TableHead>
              <SC.TableHead>Общая стоимость</SC.TableHead>
            </tr>
          </thead>
          <tbody>
            {/* FIXME: ЗАМЕНИТЬ НА specifications.length */}
            {components.length
              ? filteredItems.map((item) => (
                  <tr
                    key={`${item.name}_${item.id}`}
                    style={{
                      zIndex: editId === item.id ? 100 : 0,
                    }}
                  >
                    <td>{item.name}</td>
                    <td>{TotalQuantity(item.components)}</td>
                    <td>{CalculateTotalCost(item.components, components)}</td>
                    <td>
                      {
                        departments.find((el) => el.id === item.department_id)
                          ?.name
                      }
                    </td>
                    <TdButton onClickEdit={() => onClickEdit(item.id)} />
                  </tr>
                ))
              : null}
          </tbody>
        </SC.ItemsTable>
      </SC.ScrollTableContainer>
    </>
  );
};

export default SpecificationsDataTable;
