import { FC, FormEvent, FormEventHandler, PropsWithChildren } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/storeHooks";
import * as SC from "./AddEntryTemplates.style";
import { addUnit } from "../../../../../redux/dataSlice/dataSlice";
import axios from "axios";
import { Button } from "../Tabs/Tabs.style";

interface Props {
  onSubmit: (ev: FormEvent<HTMLFormElement>) => void;
}

const Tamplate: FC<PropsWithChildren & Props> = ({ children, onSubmit }) => {
  return (
    <SC.Form onSubmit={onSubmit}>
      {children}
      <Button type="submit">Добавить запись</Button>
    </SC.Form>
  );
};

export const AddInstallationTemplate = () => {
  const { specifications, departaments } = useAppSelector(
    (state) => state.dataSlice
  );

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  };

  return (
    <Tamplate onSubmit={onSubmit}>
      <SC.TopText>Редактирование:</SC.TopText>
      <SC.Input placeholder="Название" required />
      <SC.BlockText>Спецификации:</SC.BlockText>
      <SC.SelectsContainer>
        {departaments.map((dep) => {
          return (
            <SC.SelectBlock>
              Для "{dep.name}":
              <SC.Select key={`installSpec_for_${dep.name}`} required>
                {specifications
                  .filter((spec) => spec.departament_id === dep.id)
                  .map((el) => (
                    <option value={el.id}>{el.name}</option>
                  ))}
              </SC.Select>
            </SC.SelectBlock>
          );
        })}
      </SC.SelectsContainer>
    </Tamplate>
  );
};

export const AddSpecificationTemplate = () => {
  const { components, departaments } = useAppSelector(
    (state) => state.dataSlice
  );

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  };

  return (
    <Tamplate onSubmit={onSubmit}>
      <SC.Input placeholder="Название"></SC.Input>
      Компоненты:<SC.Select></SC.Select>
      Департамент{" "}
      <SC.Select>
        {departaments.map((el) => (
          <option>{el.name}</option>
        ))}
      </SC.Select>
    </Tamplate>
  );
};

export const AddComponentTemplate = () => {
  const { departaments } = useAppSelector((state) => state.dataSlice);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  };
  return (
    <Tamplate onSubmit={onSubmit}>
      <SC.Input placeholder="Название"></SC.Input>
      <SC.Textarea placeholder="Описание"></SC.Textarea>
      Департамент{" "}
      <SC.Select>
        {departaments.map((el) => (
          <option value={el.id}>{el.name}</option>
        ))}
      </SC.Select>
      <SC.Input placeholder="Цена" type="number"></SC.Input>
    </Tamplate>
  );
};
