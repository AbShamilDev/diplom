"use client";

import NewProject from "./NewProject/NewProject";
import Filters from "./_components/Filters/Filters";
import { ProjectsContainer } from "./page.style";
import { setData } from "@/redux/dataSlice/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { useEffect } from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import { fetchData } from "@/axios/axiosQueries";

const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.dataSlice.projects);
  const filterPeriod = useAppSelector(
    (state) => state.projectFilter.filter_period
  );
  const [startDate, endDate] = filterPeriod;

  useEffect(() => {
    fetchData()
      .then((res) => dispatch(setData(res.data)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Filters />
      <ProjectsContainer>
        {projects
          .filter((project) =>
            startDate
              ? new Date(project.start_date) >= new Date(startDate) &&
                (endDate
                  ? new Date(project.start_date) <= new Date(endDate)
                  : true)
              : true
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
