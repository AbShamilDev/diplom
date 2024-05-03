import { FC, FormEvent, PropsWithChildren } from "react";
import { useAppSelector } from "../../../../../redux/storeHooks";
import * as SC from "./TableEditors.style";
import { Button } from "../Tabs/Tabs.style";
import Loading from "@/app/_components/Loading/Loading";

interface Props {
  onSubmit: (ev: FormEvent<HTMLFormElement>) => void;
}

const TableEditorTemplate: FC<PropsWithChildren & Props> = ({
  children,
  onSubmit,
}) => {
  const { editId, isLoading } = useAppSelector((state) => state.editSlice);
  return (
    <SC.Form onSubmit={onSubmit}>
      <SC.TopText>Редактирование:</SC.TopText>
      {children}
      <Button type="submit">
        {isLoading ? (
          <Loading />
        ) : editId ? (
          "Сохранить изменения"
        ) : (
          "Добавить запись"
        )}
      </Button>
    </SC.Form>
  );
};

export default TableEditorTemplate;
