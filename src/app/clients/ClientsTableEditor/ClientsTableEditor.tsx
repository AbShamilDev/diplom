import TableEditorTemplate from "@/app/database/_components/TableEditors/TableEditors";
import { Input } from "@/app/database/_components/TableEditors/TableEditors.style";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as SC from "./ClientsTableEditor.style";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { getClients, getInstallations } from "@/redux/dataSlice/dataSlice";
import { patchClient, postClient } from "@/axios/axiosQueries";
import { setEditId } from "@/redux/editDbSlice/editDbSlice";

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

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!editId)
      postClient(fields, () => {
        dispatch(getClients());
        resetFields();
      });
    else
      patchClient({ ...fields, id: editId }, () => {
        dispatch(setEditId(null));
        dispatch(getInstallations());
      });
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
