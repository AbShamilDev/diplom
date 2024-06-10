import { Button } from "@/app/database/_components/Tabs/Tabs.style";
import styled from "@emotion/styled";

export const ProjectHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const MainBlock = styled(ProjectHeader)`
  margin-top: 20px;
`;

export const TablesBlock = styled(MainBlock)<{ height: number | undefined }>`
  flex: 1;
  padding-right: 30px;
  flex-direction: column;
  align-items: center;
  height: ${(props) => (props.height ? props.height : 0)}px;
  overflow: hidden;
  ${(props) => !props.height && "margin-top: 0;"}
  transition: ease 1.4s;
`;

export const SettingForm = styled.form<{ expand: boolean }>`
  display: flex;
  width: 30%;
  flex-direction: column;
  gap: 20px;
  margin-top: ${(props) => (props.expand ? "50" : "-50")}px;
  align-items: end;
  justify-content: start;
  transition: ease 0.5s;
`;

export const TopText = styled.span`
  font-size: 30px;
  font-weight: 500;
`;

export const FooterContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;
  font-size: 20px;
`;

export const Cost = styled.span<{ isTooMuch: boolean }>`
  ${(props) =>
    props.isTooMuch
      ? "font-size: 30px; color: red;"
      : "font-size: 26px; color: black;"}
  transition: font-size ease 0.2s;
`;

export const ProjectFooter = styled(ProjectHeader)``;

export const CloseButton = styled(Button)`
  position: absolute;
  display: flex;
  right: 10px;
  padding: 15px;
  top: 10px;
  background-color: transparent;
  &:hover {
    background-color: #00000011;
  }
`;
