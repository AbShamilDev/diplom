import styled from "@emotion/styled";

export const ItemsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  overflow: hidden;
  transition: ease 0.2s;
`;

export const ScrollTableContainer = styled.div`
  overflow: auto;
  position: relative;
  width: 100%;
  max-height: 300px;
`;

export const Title = styled.span`
  font-size: 32px;
`;

export const MiddleText = styled.span`
  margin-bottom: 3px;
  font-size: 20px;
`;

export const ElementsContainer = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  justify-content: space-between;
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

export const ItemsTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  tr {
    position: relative;
  }
  td,
  th {
    border: 1px solid #000;
    font-size: 20px;
  }
  td {
    background: rgba(0, 0, 0, 0.07);
    padding: 10px 15px;
  }
`;

export const TableHead = styled.th`
  // border: 1px solid #000;
`;

export const FnTd = styled.td`
  width: 55px;
  border: none !important;
  background-color: transparent !important;
  padding: 0 5px !important;
`;

export const TdButton = styled.button`
  display: flex;
  border: none;
  padding: 10px;
  background-color: transparent;
  cursor: pointer;
  border-radius: 10px;
  transition: ease 0.2s;
  &:hover {
    background-color: #00000010;
  }
`;
