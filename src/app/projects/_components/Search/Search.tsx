"use client";

import Image from "next/image";
import * as SC from "./Search.style";

const Search = () => {
  return (
    <SC.SearchContainer>
      <Image src={"/images/search.svg"} alt={"search"} width={24} height={24} />
      <SC.SearchInput placeholder="Ввелите наименование проекта" />
    </SC.SearchContainer>
  );
};

export default Search;
