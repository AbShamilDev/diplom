import * as SC from "./Tabs.style";
import { FC, useEffect, useState } from "react";
import {} from "../TableEditors/TableEditors";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/storeHooks";
import { setTab } from "../../../../../redux/editDbSlice/editDbSlice";
import ComponentsDataTable from "../DataTables/Tables/ComponentsDataTable";
import InstallationsTableEditor from "../TableEditors/Editors/InstallationsTableEditor";
import SpecificationsTableEditor from "../TableEditors/Editors/SpecificationsTableEditor";
import ComponentsTableEditor from "../TableEditors/Editors/ComponentsTableEditor";
import SpecificationsDataTable from "../DataTables/Tables/SpecificationsDataTable";

export interface TabsProps {
  tab: "Установки" | "Спецификации" | "Компоненты";
}

const Tabs: FC<TabsProps> = ({ tab }) => {
  const dataSlice = useAppSelector((state) => state.dataSlice);
  const [choosedTemplate, setChoosedTemplate] = useState<JSX.Element>();
  const itemsObject = {
    Установки: dataSlice.instalations,
    Спецификации: dataSlice.specifications,
    Компоненты: dataSlice.components,
  };
  const items = itemsObject[tab as keyof typeof itemsObject];
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(tab);
    switch (tab) {
      case "Установки":
        console.log("УСТАНОВКИ");
        setChoosedTemplate(<InstallationsTableEditor />);
        break;
      case "Спецификации":
        console.log("СПЕЦИФИКАЦИИ");
        setChoosedTemplate(<SpecificationsTableEditor />);
        break;
      case "Компоненты":
        setChoosedTemplate(<ComponentsTableEditor />);
        break;
      default:
        break;
    }
  }, [tab]);

  return (
    <SC.ItemsContainer>
      <SC.TopContainer>
        <SC.Title>Количество записей: {items.length}</SC.Title>
        {tab === "Спецификации" && (
          <SC.ToComponentsLink onClick={() => dispatch(setTab("Компоненты"))}>
            Компоненты
          </SC.ToComponentsLink>
        )}
      </SC.TopContainer>
      {tab === "Компоненты" ? (
        <ComponentsDataTable items={itemsObject.Компоненты} />
      ) : (
        <SpecificationsDataTable items={itemsObject.Спецификации} />
      )}
      {choosedTemplate}
    </SC.ItemsContainer>
  );
};

export default Tabs;
