import { type AxiosResponse } from "axios";
import { dataState } from "..";
import { axiosApp } from "./axiosApp";
import { projectInfo } from "@/app/projects/NewProject/NewProject";

export const fetchData = async (thenFcn: (res: AxiosResponse<any, any>) => void) => {
  return await axiosApp
    .get("/getall")
    .then(thenFcn)
    .catch((error) => console.error(error));
};

export const postInstallation = async (
  installation: Omit<dataState["installations"][0], "id">,
  thenFcn: () => void
) => {
  return await axiosApp
    .post("/installations", null, {
      params: { ...installation },
    })
    .then(thenFcn)
    .catch((error) => console.log(error));
};

export const postSpecification = async (
  specification: Omit<dataState["specifications"][0], "id">,
  thenFcn: () => void
) => {
  return await axiosApp
    .post("/specifications", null, {
      params: { ...specification },
    })
    .then(thenFcn)
    .catch((error) => console.log(error));
};

export const postComponent = async (
  component: Omit<dataState["components"][0], "id">,
  thenFcn: () => void
) => {
  return await axiosApp
    .post("/components", null, { params: { ...component } })
    .then(thenFcn)
    .catch((error) => console.log(error));
};

export const postClient = async (
  client: Omit<dataState["clients"][0], "id">,
  thenFcn: () => void
) => {
  return await axiosApp
    .post("/clients", null, { params: { ...client } })
    .then(thenFcn)
    .catch((error) => console.log(error));
};

export const postProject = async (project: projectInfo, thenFcn: () => void) => {
  return await axiosApp
    .post("/projects", null, { params: { ...project } })
    .then(thenFcn)
    .catch((error) => console.log(error));
};

export const patchInstallation = async (
  installation: dataState["installations"][0],
  thenFcn: () => void
) => {
  await axiosApp
    .patch("/installations", null, {
      params: { ...installation },
    })
    .then(thenFcn)
    .catch((error) => console.log(error));
};

export const patchSpecification = async (
  specification: dataState["specifications"][0],
  thenFcn: () => void
) => {
  await axiosApp
    .patch("/specifications", null, {
      params: { ...specification },
    })
    .then(thenFcn)
    .catch((error) => console.log(error));
};

export const patchComponent = async (
  component: dataState["components"][0],
  thenFcn: () => void
) => {
  await axiosApp
    .patch("/components", null, { params: { ...component } })
    .then(thenFcn)
    .catch((error) => console.log(error));
};

export const patchClient = async (client: dataState["clients"][0], thenFcn: () => void) => {
  await axiosApp
    .patch("/clients", null, { params: { ...client } })
    .then(thenFcn)
    .catch((error) => console.log(error));
};
