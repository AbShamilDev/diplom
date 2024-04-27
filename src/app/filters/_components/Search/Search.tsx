"use client";

import Image from "next/image";
import * as SC from "./Search.style";

const Search = () => {
  return (
    <SC.SearchContainer>
      <Image src={"./search.svg"} alt={"search"} width={24} height={24} />
      <SC.SearchInput placeholder="Наименование спецификации" />
    </SC.SearchContainer>
  );
};

export default Search;
