import TableEditorTemplate from "@/app/database/_components/TableEditors/TableEditors";
import { Input } from "@/app/database/_components/TableEditors/TableEditors.style";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import * as SC from "./ClientsTableEditor.style";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { axiosApp } from "@/axiosApp";
import { getClients } from "@/redux/dataSlice/dataSlice";

interface paramsInterface {
  id?: number;
  name: string;
  phone_number?: string;
  email?: string;
}

const ClientsTableEditor = () => {
  const [fields, setFields] = useState<paramsInterface>({
    name: "",
    phone_number: "",
    email: "",
  });
  const editId = useAppSelector((state) => state.editSlice.editId);
  const clients = useAppSelector((state) => state.dataSlice.clients);
  const dispatch = useAppDispatch();

  const resetFields = () =>
    setFields({
      name: "",
      phone_number: "",
      email: "",
    });

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!editId) {
      await axiosApp
        .post("/clients", null, { params: { ...fields } })
        .then((res) => {
          dispatch(getClients());
          resetFields();
        })
        .catch((err) => console.error(err));
    } else {
    }
  };

  const onChangeHandle = (ev: ChangeEvent<HTMLInputElement>) => {
    switch (ev.target.name) {
      case "name":
        setFields({ ...fields, name: ev.target.value });
        break;
      case "phone":
        setFields({ ...fields, phone_number: ev.target.value });
        break;
      case "email":
        setFields({ ...fields, email: ev.target.value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (editId) {
      const client = clients.filter((client) => client.id === editId)[0];
      setFields({
        name: client.name,
        phone_number: client.phone_number,
        email: client.email,
      });
    } else resetFields();
  }, [editId]);

  return (
    <TableEditorTemplate onSubmit={onSubmit}>
      <Input
        name="name"
        value={fields.name}
        onChange={onChangeHandle}
        placeholder="Введите наименование"
        required
      />
      <SC.InputMask
        mask="+7(999)999-99-99"
        name="phone"
        value={fields.phone_number}
        onChange={onChangeHandle}
        placeholder="Введите номер телефона"
        required
      ></SC.InputMask>
      <Input
        name="email"
        value={fields.email}
        onChange={onChangeHandle}
        placeholder="Введите email"
        required
      />
    </TableEditorTemplate>
  );
};

export default ClientsTableEditor;
