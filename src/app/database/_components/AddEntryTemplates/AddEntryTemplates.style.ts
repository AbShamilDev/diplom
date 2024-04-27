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
  padding: 10px 15px;
`;

export const Textarea = styled.textarea`
  padding: 10px 15px;
  border: 1px solid #7b7b7b;
  outline: none;
  border-radius: 10px;
  resize: none;
  height: 100px;
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
  gap: 50px;
  padding: 10px 20px;
  font-weight: 500;
`;
