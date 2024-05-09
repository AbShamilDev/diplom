import { FC } from "react";
import * as SC from "../DataTable.style";
import Image from "next/image";

interface Props {
  onClickEdit: () => void;
}

const TdButton: FC<Props> = ({ onClickEdit }) => {
  return (
    <SC.FnTd>
      <SC.TdButton onClick={onClickEdit}>
        <Image src="/images/edit.svg" alt="edit" width={24} height={24} />
      </SC.TdButton>
    </SC.FnTd>
  );
};

export default TdButton;
