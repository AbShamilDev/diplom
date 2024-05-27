import { registerLocale, setDefaultLocale } from "react-datepicker";
import * as SC from "./PeriodFilter.style";
import { ru } from "date-fns/locale/ru";
import { useState } from "react";
import { useAppSelector } from "@/redux/storeHooks";

const PeriodFilter = () => {
  registerLocale("ru", ru);
  const startDate = useAppSelector((state) => state.projectFilter.start_date);
  const endDate = useAppSelector((state) => state.projectFilter.end_date);
  return (
    <SC.DateInputContainer>
      <SC.DatePicker
        locale="ru"
        selectsRange
        startDate={startDate}
        endDate={endDate}
        dateFormat={"dd.MM.yyyy"}
        onChange={(update) => {}}
      />
    </SC.DateInputContainer>
  );
};

export default PeriodFilter;
