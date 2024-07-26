import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as SC from "../TableEditors.style";
import TableEditorTemplate from "../TableEditors";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { setEditId, setIsFill, setIsLoading } from "@/redux/editDbSlice/editDbSlice";
import { getComponents, setComponents } from "@/redux/dataSlice/dataSlice";
import AlternativesSelect from "../_components/AlternativesSelect/AlternativesSelect";
import { patchComponent, postComponent } from "@/axios/axiosQueries";

interface paramsInterface {
  id?: number;
  name: string;
  description: string;
  unit_id: number;
  alternatives: number[];
  link: string;
  cost: number;
}

const ComponentsTableEditor = () => {
  const { units, components } = useAppSelector((state) => state.dataSlice);
  const { isFill, editId, departmentFilter } = useAppSelector((state) => state.editSlice);
  const [fields, setFields] = useState<paramsInterface>({
    name: "",
    description: "",
    unit_id: 0,
    alternatives: [],
    link: "",
    cost: 0,
  });
  const dispatch = useAppDispatch();

  const onChangeHandle = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    switch (ev.target.name) {
      case "name":
        setFields({ ...fields, name: ev.target.value });
        break;
      case "unit":
        setFields({ ...fields, unit_id: +ev.target.value });
        break;
      case "cost":
        setFields({
          ...fields,
          cost: +ev.target.value,
        });
        break;
      case "link":
        setFields({ ...fields, link: ev.target.value });
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
      patchComponent({ ...fields, id: editId, department_id: departmentFilter }, () => {
        dispatch(setEditId(null));
        dispatch(getComponents());
      });
    } else
      postComponent({ ...fields, department_id: departmentFilter }, () => {
        setFields({
          name: "",
          description: "",
          unit_id: 0,
          alternatives: [],
          link: "",
          cost: 0,
        });
      });
    dispatch(setComponents([...components, fields]));

    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    if (
      !fields.name &&
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
        unit_id: component.unit_id,
        alternatives: component.alternatives,
        link: component.link,
        cost: component.cost,
      });
    } else {
      setFields({
        name: "",
        description: "",
        unit_id: 0,
        alternatives: [],
        cost: 0,
        link: "",
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
          style={{ gridArea: "name" }}
          required
        />
        <SC.Input
          name="link"
          placeholder="Ссылка (необязательно)"
          onChange={onChangeHandle}
          value={fields.link}
          style={{ gridArea: "link" }}
        />
        <SC.NoMarginSelect
          style={{ gridArea: "select" }}
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
          />
          <SC.CurrencySpan>₽</SC.CurrencySpan>
        </SC.CostBlock>
        <SC.ColumnBlock style={{ gridArea: "textarea" }}>
          <SC.Textarea
            name="description"
            placeholder="Описание"
            onChange={onChangeHandle}
            value={fields.description}
            required
          />
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
        />
      </SC.SelectsContainer>
    </TableEditorTemplate>
  );
};

export default ComponentsTableEditor;
