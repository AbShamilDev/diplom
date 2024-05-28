"use client";

import { useAppSelector } from "@/redux/storeHooks";
import DropdownInput from "../DropdownInput/DropdownInput";
import PeriodFilter from "../PeriodFilter/PeriodFilter";
import Search from "../Search/Search";
import * as SC from "./Filters.style";

const Filters = () => {
  const { clients, installations } = useAppSelector((state) => state.dataSlice);

  return (
    <SC.Container>
      <SC.FiltersContainer>
        Период:
        <PeriodFilter />
      </SC.FiltersContainer>
      <SC.FiltersContainer>
        Клиент:
        <SC.FilterSelect>
          <option value=""></option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </SC.FilterSelect>
      </SC.FiltersContainer>
      <SC.FiltersContainer>
        Установка:
        <SC.FilterSelect>
          <option value=""></option>
          {installations.map((installation) => (
            <option key={installation.id} value={installation.id}>
              {installation.name}
            </option>
          ))}
        </SC.FilterSelect>
      </SC.FiltersContainer>
    </SC.Container>
  );
};

export default Filters;
