"use client";

import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { ProjectsContainer } from "../projects/page.style";
import ClientsTableEditor from "./ClientsTableEditor/ClientsTableEditor";
import ClientsTable from "./ClientsTable/ClientsTable";
import { axiosApp } from "@/axiosApp";
import { useEffect } from "react";
import { setData } from "@/redux/dataSlice/dataSlice";

const ClientsPage = () => {
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    await axiosApp
      .get("/getall")
      .then((res) => dispatch(setData(res.data)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProjectsContainer>
      <ClientsTable />
      <ClientsTableEditor />
    </ProjectsContainer>
  );
};

export default ClientsPage;
