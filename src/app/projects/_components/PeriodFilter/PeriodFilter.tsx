import { registerLocale } from "react-datepicker";
import * as SC from "./PeriodFilter.style";
import { ru } from "date-fns/locale/ru";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { setFilterPeriod } from "@/redux/projectsFilterSlice/projectsFilterSlice";

const PeriodFilter = () => {
  registerLocale("ru", ru);
  const filterPeriod = useAppSelector((state) => state.projectFilter.period);
  const [startDate, endDate] = filterPeriod;
  const dispatch = useAppDispatch();
  return (
    <SC.DateInputContainer>
      <SC.DatePicker
        locale="ru"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        dateFormat={"dd.MM.yyyy"}
        onChange={(update) => {
          dispatch(setFilterPeriod(update));
        }}
      />
    </SC.DateInputContainer>
  );
};

export default PeriodFilter;
