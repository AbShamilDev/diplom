import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as SC from "../TableEditors.style";
import TableEditorTemplate from "../TableEditors";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import {
  setEditId,
  setIsFill,
  setIsLoading,
} from "@/redux/editDbSlice/editDbSlice";
import { getComponents, getInstallations } from "@/redux/dataSlice/dataSlice";
import { axiosApp } from "@/axiosApp";

interface paramsInterface {
  id?: number;
  name: string;
  fst_specification_id: number;
  snd_specification_id: number;
  trd_specification_id: number;
}

const InstallationsTableEditor = () => {
  const [fields, setFields] = useState<paramsInterface>({
    name: "",
    fst_specification_id: 0,
    snd_specification_id: 0,
    trd_specification_id: 0,
  });

  const dispatch = useAppDispatch();
  const { specifications, departments } = useAppSelector(
    (state) => state.dataSlice
  );
  const { isFill, editId } = useAppSelector((state) => state.editSlice);

  const onChangeHandle = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    switch (ev.target.name) {
      case "name":
        setFields({ ...fields, name: ev.target.value });
        break;
      case "spec-1":
        setFields({
          ...fields,
          fst_specification_id: ev.target.value === "" ? 0 : +ev.target.value,
        });
        break;
      case "spec-2":
        setFields({
          ...fields,
          snd_specification_id: ev.target.value === "" ? 0 : +ev.target.value,
        });
        break;

      case "spec-3":
        setFields({
          ...fields,
          trd_specification_id: ev.target.value === "" ? 0 : +ev.target.value,
        });
        break;
      default:
        break;
    }
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (editId) {
      await axiosApp
        .patch("/installations", null, { params: { ...fields, id: editId } })
        .then(() => {
          dispatch(setEditId(null));
          dispatch(getInstallations());
        })
        .catch((err) => console.error(err));
    } else
      await axiosApp
        .post("/installations", null, { params: fields })
        .then(() => {
          setFields({
            name: "",
            fst_specification_id: 0,
            snd_specification_id: 0,
            trd_specification_id: 0,
          });
          dispatch(getComponents());
        })
        .catch((err) => console.error(err));
    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    if (
      fields.name === "" &&
      fields.fst_specification_id === 0 &&
      fields.snd_specification_id === 0 &&
      fields.trd_specification_id === 0
    ) {
      dispatch(setIsFill(false));
    } else !isFill && dispatch(setIsFill(true));
  }, [fields]);

  return (
    <TableEditorTemplate onSubmit={onSubmit}>
      <SC.Input name="name" placeholder="Введите имя"></SC.Input>
      <SC.BlockText>Спецификации:</SC.BlockText>
      <SC.SelectsContainer style={{ display: "flex" }}>
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
