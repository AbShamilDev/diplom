import { axiosApp } from "./axiosApp";

export const fetchData = async () => {
  return await axiosApp.get("/getall");
};
