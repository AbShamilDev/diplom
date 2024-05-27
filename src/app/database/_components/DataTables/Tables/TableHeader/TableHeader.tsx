import { FC } from "react";
import { TopContainer, Title, ToComponentsLink } from "../../DataTable.style";
import { dataState } from "@/redux/dataSlice/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { setEditId, setIsFill, setTab } from "@/redux/editDbSlice/editDbSlice";
import DepartmentSwitch from "../../_components/DepartmentSwitch/DepartmentSwitch";

interface Props {
  items: dataState["components" | "installations" | "specifications"];
  showComponents?: boolean;
}

const TabHeader: FC<Props> = ({ items, showComponents }) => {
  const dispatch = useAppDispatch();
  const { editId, isFill, tab } = useAppSelector((state) => state.editSlice);

  const onClickLink = () => {
    if (editId !== null || isFill)
      if (confirm("Несохраненные изменения будут утеряны, вы уверены?")) {
        dispatch(setEditId(null));
        dispatch(setIsFill(false));
        dispatch(setTab("Компоненты"));
      } else {
      }
    else dispatch(setTab("Компоненты"));
  };
  return (
    <TopContainer>
      <Title>Количество записей: {items.length}</Title>
      {tab !== "Установки" && <DepartmentSwitch />}
      {showComponents && (
        <ToComponentsLink onClick={onClickLink}>Компоненты</ToComponentsLink>
      )}
    </TopContainer>
  );
};

export default TabHeader;
