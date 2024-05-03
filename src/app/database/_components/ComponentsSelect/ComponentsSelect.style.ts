import styled from "@emotion/styled";
import { Input } from "../TableEditors/TableEditors.style";
import { Button } from "../Tabs/Tabs.style";

export const ComponentsSelectContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const ComponentsTable = styled.table`
  margin: 10px 0;
  th {
    padding-left: 10px;
    text-align: left;
  }
  td {
    padding: 2px 10px;
  }
  & > * {
    border-bottom: 1px solid #0002;
  }

  border-collapse: collapse;
`;

export const QuantityInput = styled(Input)`
  width: 70%;
`;

export const ButtonAndCost = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;

export const AddComponentButton = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 8px 13px 8px 10px;
  background-color: #0002;
  border: none;
  border-radius: 20px;
  transition: ease 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #0003;
  }
`;

export const AvaliableComponentsContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 50%;
  alignitems: center;
  flex-wrap: wrap;
`;

export const ComponentChip = styled(Button)`
  padding: 5px 10px;
`;
