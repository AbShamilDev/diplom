import styled from "@emotion/styled";
import Link from "next/link";

export const Header = styled.header`
  display: flex;
  position: relative;
  background: #333333;
  height: calc(40px + 3vh);
  padding-left: 3%;
  align-items: center;
  width: 100%;
  box-shadow: 0 -14px 10px 20px #121212;
  z-index: 1;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  padding-right: 50%;
  align-items: center;
`;

export const NavButton = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  text-transform: uppercase;
  color: white;
  background-color: transparent;
  border: none;
  span {
    width: ${(props) => (props.active ? "100%" : 0)};
  }
  &:hover {
    span {
      width: 100%;
    }
  }
`;

export const BottomLine = styled.span`
  height: 2px;
  background-color: white;
  transition: width 0.2s ease-out;
`;
