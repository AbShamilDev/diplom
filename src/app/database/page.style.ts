import styled from "@emotion/styled";

export const mainDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 20px;
  border-radius: 20px;
  padding: 30px;
  padding-right: 5px;
  align-items: center;
  background-color: white;
  margin: 70px 0 30px 0;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

export const tabDiv = styled.button<{ offset: number; active: boolean }>`
  display: flex;
  position: absolute;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  color: black;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  border-left: 1px solid rgba(0, 0, 0, 0.25);
  border-right: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 0 0;
  ${(props) => !props.active && "padding-bottom: 5px;"}
  top: calc(-45px + ${(props) => (props.active ? 0 : 5)}px);
  left: calc(20px + ${(props) => props.offset * 144}px);
  cursor: ${(props) => (props.active ? "default" : "pointer")};
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  z-index: ${(props) => (props.active ? 10 : -10)};
  transition: ease 0.2s;
`;
