import * as SC from "./Tabs.style";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/storeHooks";
import ComponentsDataTable from "../DataTables/Tables/ComponentsDataTable";
import InstallationsTableEditor from "../TableEditors/Editors/InstallationsTableEditor";
import SpecificationsTableEditor from "../TableEditors/Editors/SpecificationsTableEditor";
import ComponentsTableEditor from "../TableEditors/Editors/ComponentsTableEditor";
import SpecificationsDataTable from "../DataTables/Tables/SpecificationsDataTable";
import InstallationsDataTable from "../DataTables/Tables/InstallationsDataTable";

export interface TabsProps {
  tab: "Установки" | "Спецификации" | "Компоненты";
}

const Tabs: FC<TabsProps> = ({ tab }) => {
  const dataSlice = useAppSelector((state) => state.dataSlice);
  const [choosedTemplate, setChoosedTemplate] = useState<JSX.Element>();
  const [choosedTable, setChoosedTable] = useState<JSX.Element>();

  useEffect(() => {
    switch (tab) {
      case "Установки":
        setChoosedTemplate(<InstallationsTableEditor />);
        setChoosedTable(
          <InstallationsDataTable items={dataSlice.instalations} />
        );
        break;
      case "Спецификации":
        setChoosedTemplate(<SpecificationsTableEditor />);
        setChoosedTable(
          <SpecificationsDataTable items={dataSlice.specifications} />
        );
        break;
      case "Компоненты":
        setChoosedTemplate(<ComponentsTableEditor />);
        setChoosedTable(<ComponentsDataTable items={dataSlice.components} />);
        break;
      default:
        break;
    }
  }, [tab, dataSlice]);

  return (
    <SC.ItemsContainer>
      {choosedTable}
      {choosedTemplate}
    </SC.ItemsContainer>
  );
};

export default Tabs;
