import { FC } from "react";
import { dataState } from "../../../../../../redux/dataSlice/dataSlice";
import * as SC from "../DataTable.style";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../redux/storeHooks";
import { setEditId } from "../../../../../../redux/editDbSlice/editDbSlice";
import Image from "next/image";
import { CalculateTotalCost } from "@/app/globalFcns";

interface Props {
  items: dataState["specifications"];
}

const SpecificationsDataTable: FC<Props> = ({ items }) => {
  const { departments, components } = useAppSelector(
    (state) => state.dataSlice
  );
  const { editId } = useAppSelector((state) => state.editSlice);
  const dispatch = useAppDispatch();

  const onClickDelete = (id: number) => {
    editId ? dispatch(setEditId(null)) : dispatch(setEditId(id));
  };

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

  return (
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
            ? items.map((item) => (
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
                  <SC.FnTd>
                    <SC.TdButton onClick={() => {}}>
                      <Image
                        src="/images/delete.svg"
                        alt="edit"
                        width={24}
                        height={24}
                      />
                    </SC.TdButton>
                  </SC.FnTd>
                  <SC.FnTd>
                    <SC.TdButton onClick={() => onClickEdit(item.id)}>
                      <Image
                        src="/images/edit.svg"
                        alt="edit"
                        width={24}
                        height={24}
                      />
                    </SC.TdButton>
                  </SC.FnTd>
                </tr>
              ))
            : null}
        </tbody>
      </SC.ItemsTable>
    </SC.ScrollTableContainer>
  );
};

export default SpecificationsDataTable;
