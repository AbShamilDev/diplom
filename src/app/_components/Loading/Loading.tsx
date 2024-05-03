import * as SC from "./Loading.style";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <SC.LoadingContainer>
      <SC.LoadingMiddle />
    </SC.LoadingContainer>
  );
};

export default Loading;
