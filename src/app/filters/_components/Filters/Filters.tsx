"use client";

import DropdownInput from "../DropdownInput/DropdownInput";
import Search from "../Search/Search";
import * as SC from "./Filters.style";

const Filters = () => {
  return (
    <SC.Container>
      <Search />
      <SC.DropdownsContainer>
        <DropdownInput options={["1 канал", "2 канал"]} onChange={() => {}} />
        <DropdownInput options={["10", "20", "30"]} onChange={() => {}} />
        <DropdownInput
          options={["Еще не придумал", "Не придумал говорю же"]}
          onChange={() => {}}
        />
      </SC.DropdownsContainer>
    </SC.Container>
  );
};

export default Filters;
