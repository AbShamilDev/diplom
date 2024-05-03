"use client";
import Image from "next/image";
import * as SC from "./Header.style";
import { usePathname } from "next/navigation";

const buttons = [
  { text: "база данных", route: "database" },
  { text: "фильтры", route: "filters" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <SC.Header>
      <Image src="/images/pslogo.svg" alt="logo" width={40} height={40} />
      <SC.ButtonsContainer>
        {buttons.map((button) => (
          <SC.NavButton
            key={button.text}
            href={`/${button.route}`}
            active={pathname.includes(button.route)}
          >
            {button.text}
            <SC.BottomLine></SC.BottomLine>
          </SC.NavButton>
        ))}
      </SC.ButtonsContainer>
    </SC.Header>
  );
};

export default Header;
