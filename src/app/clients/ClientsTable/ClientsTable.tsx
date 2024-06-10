import {
  ItemsTable,
  TableHead,
} from "@/app/database/_components/DataTables/DataTable.style";
import DataTableTemplate from "@/app/database/_components/DataTables/DataTableTemplate";
import TabHeader from "@/app/database/_components/DataTables/Tables/TableHeader/TableHeader";
import TdButton from "@/app/database/_components/DataTables/_components/TdButton";
import { setEditId } from "@/redux/editDbSlice/editDbSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";

const ClientsTable = () => {
  const clients = useAppSelector((state) => state.dataSlice.clients);
  const editId = useAppSelector((state) => state.editSlice.editId);
  const dispatch = useAppDispatch();

  const onClickEdit = (id: number) => {
    editId ? dispatch(setEditId(null)) : dispatch(setEditId(id));
  };
  return (
    <>
      <TabHeader items={clients}></TabHeader>
      <DataTableTemplate>
        <ItemsTable>
          <thead>
            <tr>
              <TableHead>Имя</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Почта</TableHead>
            </tr>
          </thead>
          <tbody>
            {clients &&
              clients.map((client) => (
                <tr
                  key={`${client.id}_${client.name}`}
                  style={{
                    zIndex: editId === client.id ? 100 : 0,
                  }}
                >
                  <td>{client.name}</td>
                  <td>{client.phone_number}</td>
                  <td>{client.email}</td>
                  <TdButton onClickEdit={() => onClickEdit(client.id)} />
                </tr>
              ))}
          </tbody>
        </ItemsTable>
      </DataTableTemplate>
    </>
  );
};

export default ClientsTable;
