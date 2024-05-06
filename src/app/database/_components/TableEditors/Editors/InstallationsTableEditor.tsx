import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as SC from "../TableEditors.style";
import TableEditorTemplate from "../TableEditors";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { setIsFill } from "@/redux/editDbSlice/editDbSlice";

const InstallationsTableEditor = () => {
  const [fields, setFields] = useState({
    name: "",
    fst_specification_id: "",
    snd_specification_id: "",
    trd_specification_id: "",
  });

  const dispatch = useAppDispatch();
  const { specifications, departments } = useAppSelector(
    (state) => state.dataSlice
  );
  const { isFill } = useAppSelector((state) => state.editSlice);

  const onChangeHandle = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(ev.target.name === "spec-1");
    switch (ev.target.name) {
      case "name":
        setFields({ ...fields, name: ev.target.value });
        break;
      case "spec-1":
        setFields({
          ...fields,
          fst_specification_id: ev.target.value,
        });
        break;
      case "spec-2":
        setFields({
          ...fields,
          snd_specification_id: ev.target.value,
        });
        break;

      case "spec-3":
        setFields({
          ...fields,
          trd_specification_id: ev.target.value,
        });
        break;
      default:
        break;
    }
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log("submit");
  };

  useEffect(() => {
    if (
      fields.name === "" &&
      fields.fst_specification_id === "" &&
      fields.snd_specification_id === "" &&
      fields.trd_specification_id === ""
    ) {
      dispatch(setIsFill(false));
    } else !isFill && dispatch(setIsFill(true));
  }, [fields]);

  return (
    <TableEditorTemplate onSubmit={onSubmit}>
      <SC.Select
        onChange={onChangeHandle}
        value={fields.name}
        name="name"
        required
      >
        <option value="">Выберите че-то там</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </SC.Select>
      <SC.BlockText>Спецификации:</SC.BlockText>
      <SC.SelectsContainer>
        {departments.map((dep, i) => {
          return (
            <SC.SelectBlock key={dep.name}>
              Для &quot;{dep.name}&quot;:
              <SC.Select
                key={`installSpec_for_${dep.name}`}
                name={`spec-${i + 1}`}
                required
                onChange={onChangeHandle}
              >
                <option value="">Выберите спецификацию</option>
                <option value="2">2</option>
                {specifications
                  .filter((spec) => spec.department_id === dep.id)
                  .map((el) => (
                    <option key={`option2_${dep.name}`} value={`${el.id}`}>
                      {el.name}
                    </option>
                  ))}
              </SC.Select>
            </SC.SelectBlock>
          );
        })}
      </SC.SelectsContainer>
    </TableEditorTemplate>
  );
};

export default InstallationsTableEditor;