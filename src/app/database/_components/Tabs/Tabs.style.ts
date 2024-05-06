import styled from "@emotion/styled";

export const ItemsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  overflow: hidden;
  transition: ease 0.2s;
`;

export const MiddleText = styled.span`
  margin-bottom: 3px;
  font-size: 20px;
`;

export const Button = styled.button<{ isCancel?: boolean }>`
  border: none;
  background-color: ${(props) =>
    props.disabled ? "#CECECE" : props.isCancel ? "#FF0000af" : "#477de7"};
  color: ${(props) => (props.disabled ? "#7B7B7B" : "white")};
  font-weight: 300;
  padding: 10px 14px;
  cursor: pointer;
  border-radius: 12px;
  transition: ease 0.2s;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;
