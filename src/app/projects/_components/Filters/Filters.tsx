"use client";

import DropdownInput from "../DropdownInput/DropdownInput";
import PeriodFilter from "../PeriodFilter/PeriodFilter";
import Search from "../Search/Search";
import * as SC from "./Filters.style";

const Filters = () => {
  return (
    <SC.Container>
      <Search />
      <SC.FiltersContainer></SC.FiltersContainer>
      <PeriodFilter />
    </SC.Container>
  );
};

export default Filters;
