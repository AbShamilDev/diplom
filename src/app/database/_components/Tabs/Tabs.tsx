import * as SC from "./Tabs.style";
import { FC, useState } from "react";
import {
  AddInstallationTemplate,
  AddSpecificationTemplate,
} from "../AddEntryTemplates/AddEntryTemplates";
import Image from "next/image";
import axiosApp from "../../../../../axios";
import { useAppSelector } from "../../../../../redux/storeHooks";

export interface TabsProps {
  tab: "Установки" | "Спецификации";
}

const Tabs: FC<TabsProps> = ({ tab }) => {
  const [editId, setEditId] = useState(-1);
  const [editorFields, setEditorFields] = useState({
    name: "",
    specifications: [],
  });
  const dataSlice = useAppSelector((state) => state.dataSlice);
  // const items =
  //   tab === "Установки" ? dataSlice.instalations : dataSlice.specifications;
  const items = dataSlice.departaments;
  const itemsHeaders = items.length ? Object.keys(items[0]) : [];

  const deleteItem = async (id: number) => {
    switch (tab) {
      case "Установки":
        // await axiosApp.delete('/instalations', {params});
        break;

      default:
        break;
    }
  };

  return (
    <SC.ItemsContainer>
      <SC.Title>Количество записей: {items.length}</SC.Title>
      <SC.ScrollTableContainer>
        <div
          style={{
            display: editId !== -1 ? "block" : "none",
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "#fffb",
            zIndex: editId !== -1 ? 10 : 0,
          }}
        ></div>
        <SC.ItemsTable>
          <thead>
            <tr>
              {itemsHeaders.map((header, index) => (
                <SC.TableHead key={index}>{header}</SC.TableHead>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={`${item.id}_${item.name}`}
                style={{ zIndex: item.id === editId ? 100 : 0 }}
              >
                {Object.values(item).map((el) => (
                  <td key={el.toString()}>{el}</td>
                ))}
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
                  <SC.TdButton
                    onClick={() => setEditId(editId !== -1 ? -1 : item.id)}
                  >
                    <Image
                      src="/images/edit.svg"
                      alt="edit"
                      width={24}
                      height={24}
                    />
                  </SC.TdButton>
                </SC.FnTd>
              </tr>
            ))}
          </tbody>
        </SC.ItemsTable>
      </SC.ScrollTableContainer>
      {tab === "Установки" ? (
        <AddInstallationTemplate />
      ) : (
        <AddSpecificationTemplate />
      )}
    </SC.ItemsContainer>
  );
};

export default Tabs;
