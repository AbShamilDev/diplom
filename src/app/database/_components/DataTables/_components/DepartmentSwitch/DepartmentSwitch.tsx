import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import * as SC from "./DepartmentSwitch.style";
import { BottomLine } from "@/app/_components/Header/Header.style";
import { setDepartmentFilter } from "@/redux/editDbSlice/editDbSlice";

const DepartmentSwitch = () => {
  const departments = useAppSelector((state) => state.dataSlice.departments);
  const DepartmentFilter = useAppSelector(
    (state) => state.editSlice.departmentFilter
  );
  const dispatch = useAppDispatch();
  return (
    <SC.SwitchContainer>
      {departments?.map((dep) => (
        <SC.ButtonWrapper key={`departmentSwitch_${dep.id}`}>
          <SC.DepartmentButton
            onClick={() => dispatch(setDepartmentFilter(dep.id))}
            active={dep.id === DepartmentFilter}
          >
            {dep.name}
            <BottomLine></BottomLine>
          </SC.DepartmentButton>
        </SC.ButtonWrapper>
      ))}
    </SC.SwitchContainer>
  );
};

export default DepartmentSwitch;
