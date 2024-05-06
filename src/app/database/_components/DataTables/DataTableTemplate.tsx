import { FC, PropsWithChildren } from "react";
import * as SC from "./DataTable.style";
import { useAppSelector } from "@/redux/storeHooks";

const DataTableTemplate: FC<PropsWithChildren> = ({ children }) => {
  const { editId } = useAppSelector((state) => state.editSlice);

  return (
    <SC.ScrollTableContainer
      style={{
        overflow: editId !== null ? "hidden" : "auto",
      }}
    >
      <div
        style={{
          display: editId !== null ? "block" : "none",
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "#fffb",
          zIndex: editId !== null ? 10 : 0,
        }}
      ></div>
      {children}
    </SC.ScrollTableContainer>
  );
};

export default DataTableTemplate;
