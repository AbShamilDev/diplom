import styled from "@emotion/styled";
import { Button } from "../../../Tabs/Tabs.style";

export const SwitchContainer = styled.div`
  display: flex;
`;

export const ButtonWrapper = styled.div`
  position: relative;
`;

export const DepartmentButton = styled(Button)<{ active: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: transparent;
  font-size: 18px;
  color: ${(props) => (props.active ? "#477de7" : "gray")};
  span {
    height: 1px;
    background-color: ${(props) => (props.active ? "#477de7" : "gray")};
    width: ${(props) => (props.active ? "100%" : "0")};
  }
  &:hover {
    span {
      width: 100%;
    }
  }
`;
