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
  height: 184px;
  flex: 1;
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

export const noMarginSelect = styled(Select)`
  margin-top: 0;
  margin-left: 0;
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
  display: flex;
  width: 100%;
  align-items: end;
  gap: 30px;
  padding: 10px 20px;
  font-weight: 500;
`;

export const ColumnBlock = styled.div`
  display: flex;
  gap: 4px;
  width: 30%;
  flex-direction: column;
`;

export const CostBlock = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  align-items: center;
`;

export const CurrencySpan = styled.span`
  margin: 0 5px;
  font-size: 20px;
`;
