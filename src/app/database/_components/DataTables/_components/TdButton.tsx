import { FC } from "react";
import * as SC from "../DataTable.style";
import Image from "next/image";

interface Props {
  onClickEdit: () => void;
  linkEnable?: boolean;
  link?: string;
}

const TdButton: FC<Props> = ({ onClickEdit, linkEnable, link }) => {
  return (
    <>
      <SC.FnTd>
        <SC.TdButton onClick={onClickEdit}>
          <Image src="/images/edit.svg" alt="edit" width={24} height={24} />
        </SC.TdButton>
      </SC.FnTd>
      {linkEnable && (
        <SC.FnTd>
          <a
            href={link}
            target="_blank"
            aria-disabled
            style={link ? {} : { opacity: "40%", pointerEvents: "none" }}
          >
            <SC.TdButton>
              <Image src="/images/link.svg" alt="edit" width={24} height={24} />
            </SC.TdButton>
          </a>
        </SC.FnTd>
      )}
    </>
  );
};

export default TdButton;
