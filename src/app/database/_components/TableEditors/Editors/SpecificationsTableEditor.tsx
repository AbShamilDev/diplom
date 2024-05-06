import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as SC from "../TableEditors.style";
import TableEditorTemplate from "../TableEditors";
import ComponentsSelect from "../../ComponentsSelect/ComponentsSelect";
import { dataState, getSpecifications } from "@/redux/dataSlice/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { axiosApp } from "@/axiosApp";
import { setIsFill } from "@/redux/editDbSlice/editDbSlice";

interface specificationFieldsInterface {
  name: string;
  department_id: number | string;
  components: dataState["specifications"][0]["components"];
}

const SpecificationsTableEditor = () => {
  const [fields, setFields] = useState<specificationFieldsInterface>({
    name: "",
    department_id: 0,
    components: [],
  });

  const dispatch = useAppDispatch();
  const { isFill, editId } = useAppSelector((state) => state.editSlice);
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
      case "department":
        setFields({
          ...fields,
          department_id: +ev.target.value,
          components: [],
        });
        break;
      default:
        break;
    }
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    await axiosApp
      .post("/specifications", null, {
        params: {
          name: fields.name,
          department_id: fields.department_id,
          components: fields.components,
        },
      })
      .then(() => dispatch(getSpecifications()))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (
      fields.name === "" &&
      fields.department_id === 0 &&
      !fields.components.length
    ) {
      dispatch(setIsFill(false));
    } else !isFill && dispatch(setIsFill(true));
  }, [fields]);

  useEffect(() => {
    if (editId !== null) {
      const specification = specifications.filter((el) => el.id === editId)[0];
      setFields({
        name: specification.name,
        components: specification.components,
        department_id: specification.department_id,
      });
    } else {
      setFields({
        name: "",
        components: [],
        department_id: 0,
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
      {fields.department_id ? (
        <>
          <SC.BlockText>Компоненты:</SC.BlockText>
          <ComponentsSelect
            departmentFilter={+fields.department_id}
            setComponents={(el) => setFields({ ...fields, components: el })}
            choosedComponents={fields.components}
          />
        </>
      ) : (
        <SC.BlockText style={{ color: "gray", marginTop: "50px" }}>
          Выберите отдел для добавления компонентов
        </SC.BlockText>
      )}
      <SC.SelectsContainer>
        <SC.SelectBlock>
          Отдел:
          <SC.Select
            name="department"
            onChange={onChangeHandle}
            required
            value={fields.department_id}
          >
            <option value="">Выберите отдел</option>
            {departments.map((dep) => (
              <option key={`option_${dep.name}`} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </SC.Select>
        </SC.SelectBlock>
      </SC.SelectsContainer>
    </TableEditorTemplate>
  );
};

export default SpecificationsTableEditor;
