import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as SC from "../TableEditors.style";
import TableEditorTemplate from "../TableEditors";
import ComponentsSelect from "../_components/ComponentsSelect/ComponentsSelect";
import { dataState, getSpecifications } from "@/redux/dataSlice/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { setEditId, setIsFill } from "@/redux/editDbSlice/editDbSlice";
import { patchSpecification, postSpecification } from "@/axios/axiosQueries";

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
  const { isFill, editId, departmentFilter } = useAppSelector((state) => state.editSlice);
  const { specifications } = useAppSelector((state) => state.dataSlice);

  const onChangeHandle = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      patchSpecification({ ...fields, department_id: departmentFilter, id: editId }, () => {
        setFields({
          name: "",
          components: [],
        });
        dispatch(setEditId(null));
        dispatch(getSpecifications());
      });
    } else
      postSpecification({ ...fields, department_id: departmentFilter }, () => {
        setFields({
          name: "",
          components: [],
        });
        dispatch(getSpecifications());
      });
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
