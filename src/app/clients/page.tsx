"use client";

import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { ProjectsContainer } from "../projects/page.style";
import ClientsTableEditor from "./ClientsTableEditor/ClientsTableEditor";
import ClientsTable from "./ClientsTable/ClientsTable";
import { useEffect } from "react";
import { setData } from "@/redux/dataSlice/dataSlice";
import { fetchData } from "@/axios/axiosQueries";

const ClientsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchData((res) => dispatch(setData(res.data)))
  }, []);

  return (
    <ProjectsContainer>
      <ClientsTable />
      <ClientsTableEditor />
    </ProjectsContainer>
  );
};

export default ClientsPage;
