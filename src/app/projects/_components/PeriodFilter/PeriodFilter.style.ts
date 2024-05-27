import styled from "@emotion/styled";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
export const DateInputContainer = styled.div``;

export const DatePicker = styled(ReactDatePicker)`
  padding: 5px;
  border-radius: 10px;
  border: 1px solid black;
  outline: none;
  width: 200px;
`;
