import styled from "@emotion/styled";
import exp from "constants";

export const Container = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;
  background-color: #cccccc;
  width: 100%;
  padding: 20px 14%;
`;

export const FiltersContainer = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  gap: 10px;
`;

export const FilterSelect = styled.select`
  padding: 4px 10px;
  border-radius: 10px;
  border: 1px solid black;
  outline: none;
  width: 210px;
`;
