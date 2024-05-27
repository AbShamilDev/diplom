"use client";

import { axiosApp } from "@/axiosApp";
import NewProject from "./NewProject/NewProject";
import Filters from "./_components/Filters/Filters";
import { ProjectsContainer } from "./page.style";
import { setData } from "@/redux/dataSlice/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { useEffect } from "react";
import ProjectCard from "./ProjectCard/ProjectCard";

const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.dataSlice.projects);
  const startDate = useAppSelector((state) => state.projectFilter.start_date);
  const endDate = useAppSelector((state) => state.projectFilter.end_date);
  const fetchData = async () => {
    await axiosApp
      .get("/getall")
      .then((res) => dispatch(setData(res.data)))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log();
  return (
    <>
      <Filters />
      <ProjectsContainer>
        {projects
          .filter((project) =>
            startDate ? new Date(project.start_date) < startDate : true
          )
          .map((project) => (
            <ProjectCard key={`project_${project.id}`} project={project} />
          ))}
        <NewProject />
      </ProjectsContainer>
    </>
  );
};

export default ProjectsPage;
