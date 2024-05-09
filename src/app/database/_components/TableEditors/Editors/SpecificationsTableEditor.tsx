import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as SC from "../TableEditors.style";
import TableEditorTemplate from "../TableEditors";
import ComponentsSelect from "../_components/ComponentsSelect/ComponentsSelect";
import { dataState, getSpecifications } from "@/redux/dataSlice/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { axiosApp } from "@/axiosApp";
import { setEditId, setIsFill } from "@/redux/editDbSlice/editDbSlice";

interface paramsInterface {
  id?: number;
  name: string;
  department_id?: number;
  components: dataState["specifications"][0]["components"];
}

const SpecificationsTableEditor = () => {
  const [fields, setFields] = useState<paramsInterface>({
    name: "",
    components: [],
  });

  const dispatch = useAppDispatch();
  const { isFill, editId, departmentFilter } = useAppSelector(
    (state) => state.editSlice
  );
  const { departments, specifications } = useAppSelector(
    (state) => state.dataSlice
  );

  const onChangeHandle = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    switch (ev.target.name) {
      case "name":
        setFields({ ...fields, name: ev.target.value });
        break;
      default:
        break;
    }
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (editId) {
      await axiosApp
        .patch("/specifications", null, {
          params: { ...fields, department_id: departmentFilter, id: editId },
        })
        .then(() => {
          setFields({
            name: "",
            components: [],
          });
          dispatch(setEditId(null));
          dispatch(getSpecifications());
        })
        .catch((err) => console.error(err));
    } else
      await axiosApp
        .post("/specifications", null, {
          params: { ...fields, department_id: departmentFilter },
        })
        .then(() => {
          setFields({
            name: "",
            components: [],
          });
          dispatch(getSpecifications());
        })
        .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (fields.name === "" && !fields.components.length) {
      dispatch(setIsFill(false));
    } else !isFill && dispatch(setIsFill(true));
  }, [fields]);

  useEffect(() => {
    if (editId !== null) {
      const specification = specifications.filter((el) => el.id === editId)[0];
      setFields({
        name: specification.name,
        components: specification.components,
      });
    } else {
      setFields({
        name: "",
        components: [],
      });
    }
  }, [editId]);

  return (
    <TableEditorTemplate onSubmit={onSubmit}>
      <SC.Input
        name="name"
        placeholder="Название"
        onChange={onChangeHandle}
        value={fields.name}
        required
      />
      <SC.BlockText>Компоненты:</SC.BlockText>
      <ComponentsSelect
        setComponents={(el) => setFields({ ...fields, components: el })}
        choosedComponents={fields.components}
      />
    </TableEditorTemplate>
  );
};

export default SpecificationsTableEditor;
