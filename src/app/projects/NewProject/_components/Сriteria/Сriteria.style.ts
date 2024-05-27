import { Input } from "@/app/database/_components/TableEditors/TableEditors.style";
import styled from "@emotion/styled";

export const ProjectDatasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
`;

export const DataContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: end;
  gap: 10px;
`;

export const DataInput = styled(Input)`
  width: unset;
`;

export const HelperText = styled.span`
  font-size: 20px;
`;
