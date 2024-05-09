import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as SC from "../TableEditors.style";
import TableEditorTemplate from "../TableEditors";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import {
  setEditId,
  setIsFill,
  setIsLoading,
} from "@/redux/editDbSlice/editDbSlice";
import { getComponents } from "@/redux/dataSlice/dataSlice";
import { axiosApp } from "@/axiosApp";
import AlternativesSelect from "../_components/AlternativesSelect/AlternativesSelect";

interface paramsInterface {
  id?: number;
  name: string;
  description: string;
  department_id: number | string;
  unit_id: number | string;
  alternatives: number[];
  cost: number | string;
}

const ComponentsTableEditor = () => {
  const { units, departments, components } = useAppSelector(
    (state) => state.dataSlice
  );
  const { isFill, editId } = useAppSelector((state) => state.editSlice);
  const [fields, setFields] = useState<paramsInterface>({
    name: "",
    description: "",
    department_id: "",
    unit_id: "",
    alternatives: [],
    cost: "",
  });
  const dispatch = useAppDispatch();

  const onChangeHandle = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    switch (ev.target.name) {
      case "name":
        setFields({ ...fields, name: ev.target.value });
        break;
      case "department":
        setFields({
          ...fields,
          department_id: ev.target.value,
          alternatives: [],
        });
        break;
      case "unit":
        setFields({ ...fields, unit_id: ev.target.value });
        break;
      case "cost":
        setFields({
          ...fields,
          cost: ev.target.value,
        });
        break;
      case "description":
        setFields({ ...fields, description: ev.target.value });
        break;
      case "alternatives":
        if (ev.target.value !== "")
          setFields({
            ...fields,
            alternatives: [...fields.alternatives, +ev.target.value],
          });
        break;
      default:
        break;
    }
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    dispatch(setIsLoading(true));

    if (editId) {
      await axiosApp
        .patch("/components", null, { params: { ...fields, id: editId } })
        .then(() => {
          dispatch(setEditId(null));
          dispatch(getComponents());
        })
        .catch((err) => console.error(err));
    } else
      await axiosApp
        .post("/components", null, { params: fields })
        .then(() => {
          setFields({
            name: "",
            description: "",
            department_id: "",
            unit_id: "",
            alternatives: [],
            cost: "",
          });
          dispatch(getComponents());
        })
        .catch((err) => console.error(err));
    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    if (
      !fields.name &&
      !fields.department_id &&
      !fields.description &&
      !fields.cost &&
      !fields.alternatives.length &&
      !fields.unit_id
    ) {
      dispatch(setIsFill(false));
    } else !isFill && dispatch(setIsFill(true));
  }, [fields]);

  useEffect(() => {
    if (editId !== null) {
      const component = components.filter((el) => el.id === editId)[0];
      setFields({
        name: component.name,
        description: component.description,
        department_id: component.department_id,
        unit_id: component.unit_id,
        alternatives: component.alternatives,
        cost: `${component.cost}`,
      });
    } else {
      setFields({
        name: "",
        description: "",
        department_id: "",
        unit_id: "",
        alternatives: [],
        cost: "",
      });
    }
  }, [editId]);

  return (
    <TableEditorTemplate onSubmit={onSubmit}>
      <SC.SelectsContainer>
        <SC.Input
          name="name"
          placeholder="Название"
          onChange={onChangeHandle}
          value={fields.name}
          required
        />
        <SC.NoMarginSelect
          name="department"
          onChange={onChangeHandle}
          value={fields.department_id}
          required
        >
          <option value="">Выберите отдел</option>
          {departments.map((dep) => (
            <option key={`option3_${dep.name}`} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </SC.NoMarginSelect>
        <SC.NoMarginSelect
          style={{ gridArea: "select2" }}
          name="unit"
          onChange={onChangeHandle}
          value={fields.unit_id}
          required
        >
          <option value="">Выберите единицу измерения</option>
          {units.map((unit) => (
            <option key={`unit_option_${unit.name}`} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </SC.NoMarginSelect>
        <SC.CostBlock>
          <SC.Input
            name="cost"
            placeholder="Цена"
            type="number"
            onChange={onChangeHandle}
            value={fields.cost}
            required
          ></SC.Input>
          <SC.CurrencySpan>₽</SC.CurrencySpan>
        </SC.CostBlock>
        <SC.ColumnBlock style={{ gridArea: "textarea" }}>
          <SC.Textarea
            name="description"
            placeholder="Описание"
            onChange={onChangeHandle}
            value={fields.description}
            required
          ></SC.Textarea>
          Альтернативы
        </SC.ColumnBlock>
        <AlternativesSelect
          onChange={onChangeHandle}
          onDelete={(id) =>
            setFields({
              ...fields,
              alternatives: fields.alternatives.filter((altId) => altId !== id),
            })
          }
          alternatives={fields.alternatives}
          department_id={+fields.department_id}
        />
      </SC.SelectsContainer>
    </TableEditorTemplate>
  );
};

export default ComponentsTableEditor;
