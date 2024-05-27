import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as SC from "../TableEditors.style";
import TableEditorTemplate from "../TableEditors";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import {
  setEditId,
  setIsFill,
  setIsLoading,
} from "@/redux/editDbSlice/editDbSlice";
import { getInstallations } from "@/redux/dataSlice/dataSlice";
import { axiosApp } from "@/axiosApp";

interface paramsInterface {
  id?: number;
  name: string;
  fst_specification_id: number;
  snd_specification_id: number;
  trd_specification_id: number;
  two_lines: boolean;
}

const InstallationsTableEditor = () => {
  const [fields, setFields] = useState<paramsInterface>({
    name: "",
    fst_specification_id: 0,
    snd_specification_id: 0,
    trd_specification_id: 0,
    two_lines: false,
  });

  const dispatch = useAppDispatch();
  const { specifications, departments, installations } = useAppSelector(
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
      case "two_lines":
        if (ev.target instanceof HTMLInputElement) {
          setFields({
            ...fields,
            two_lines: ev.target.checked,
          });
        }
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
            two_lines: false,
          });
          dispatch(getInstallations());
        })
        .catch((err) => console.error(err));
    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    if (
      fields.name === "" &&
      fields.fst_specification_id === 0 &&
      fields.snd_specification_id === 0 &&
      fields.trd_specification_id === 0 &&
      !fields.two_lines
    ) {
      dispatch(setIsFill(false));
    } else !isFill && dispatch(setIsFill(true));
  }, [fields]);

  useEffect(() => {
    if (editId) {
      const installation = installations.filter((el) => el.id === editId)[0];
      setFields({
        name: installation.name,
        fst_specification_id: installation.fst_specification_id,
        snd_specification_id: installation.snd_specification_id,
        trd_specification_id: installation.trd_specification_id,
        two_lines: !!installation.two_lines,
      });
    } else
      setFields({
        name: "",
        fst_specification_id: 0,
        snd_specification_id: 0,
        trd_specification_id: 0,
        two_lines: false,
      });
  }, [editId]);
  return (
    <TableEditorTemplate onSubmit={onSubmit}>
      <SC.Input
        name="name"
        placeholder="Введите имя"
        value={fields.name}
        onChange={onChangeHandle}
      ></SC.Input>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SC.BlockText>Спецификации:</SC.BlockText>
      </div>
      <SC.SelectsContainer style={{ display: "flex" }}>
        {departments.map((dep, i) => {
          return (
            <SC.SelectBlock key={dep.name}>
              Для &quot;{dep.name}&quot;:
              <SC.Select
                key={`installSpec_for_${dep.name}`}
                name={`spec-${i + 1}`}
                required
                value={
                  i === 0
                    ? fields.fst_specification_id
                    : i === 1
                    ? fields.snd_specification_id
                    : fields.trd_specification_id
                }
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
        <SC.ColumnBlock style={{ margin: "0 20px" }}>
          <label htmlFor="two_lines">2 линии</label>
          <SC.CheckBox
            type="checkbox"
            name="two_lines"
            id="two_lines"
            checked={fields.two_lines}
            onChange={onChangeHandle}
          />
        </SC.ColumnBlock>
      </SC.SelectsContainer>
    </TableEditorTemplate>
  );
};

export default InstallationsTableEditor;
