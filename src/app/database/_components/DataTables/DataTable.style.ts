import styled from "@emotion/styled";

export const ScrollTableContainer = styled.div`
  overflow: auto;
  position: relative;
  width: 100%;
  max-height: 500px;
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

export const Title = styled.span`
  font-size: 32px;
`;

export const TopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ToComponentsLink = styled.span`
  cursor: pointer;
  color: #000a;
  margin-right: 30px;
`;
