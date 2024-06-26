import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  width: 100%;
  gap: 10px;
  padding-right: 25px;
  flex-direction: column;
  margin: 20px 0;
`;

export const Input = styled.input`
  outline: none;
  border: 1px solid #7b7b7b;
  border-radius: 10px;
  width: 100%;
  padding: 10px 15px;
`;

export const Textarea = styled.textarea`
  padding: 10px 15px;
  border: 1px solid #7b7b7b;
  outline: none;
  flex: 1;
  width: 100%;
  border-radius: 10px;
  resize: none;
`;

export const Select = styled.select`
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
  padding: 10px 15px;
  border: 1px solid #7b7b7b;
  outline: none;
  border-radius: 10px;
`;

export const NoMarginSelect = styled(Select)`
  margin-top: 0;
  margin-left: 0;
  grid-area: select;
`;

export const SelectBlock = styled.div`
  flex: 1;
`;

export const BlockText = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

export const TopText = styled.span`
  font-size: 26px;
  font-weight: 500;
`;

export const SelectsContainer = styled.div`
  display: grid;
  grid-template:
    "name textarea"
    "link textarea"
    "select textarea"
    "cost alternatives";
  grid-gap: 10px;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  padding: 10px 20px;
  font-weight: 500;
`;

export const ColumnBlock = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

export const CostBlock = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  grid-area: cost;
  align-items: center;
`;

export const AltenativesBlock = styled(CostBlock)`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-area: alternatives;
  align-items: start;
  & > select {
    grid-area: unset;
  }
`;

export const CurrencySpan = styled.span`
  margin: 0 5px;
  font-size: 20px;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 0 10px;
  & > input {
    width: 20px;
  }
`;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;
