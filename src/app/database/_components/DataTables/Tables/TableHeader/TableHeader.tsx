import { FC } from "react";
import { TopContainer, Title, ToComponentsLink } from "../../DataTable.style";
import { dataState } from "@/redux/dataSlice/dataSlice";
import { useAppDispatch } from "@/redux/storeHooks";
import { setTab } from "@/redux/editDbSlice/editDbSlice";

interface Props {
  items: dataState["components" | "instalations" | "specifications"];
  showComponents?: boolean;
}

const TabHeader: FC<Props> = ({ items, showComponents }) => {
  const dispatch = useAppDispatch();
  return (
    <TopContainer>
      <Title>Количество записей: {items.length}</Title>
      {showComponents && (
        <ToComponentsLink onClick={() => dispatch(setTab("Компоненты"))}>
          Компоненты
        </ToComponentsLink>
      )}
    </TopContainer>
  );
};

export default TabHeader;
