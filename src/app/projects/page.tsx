"use client";

import NewProject from "./NewProject/NewProject";
import Filters from "./_components/Filters/Filters";
import { ProjectsContainer } from "./page.style";
import { setData } from "@/redux/dataSlice/dataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import { fetchData } from "@/axios/axiosQueries";

const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const { projects, clients, installations } = useAppSelector((state) => state.dataSlice);
  const filters = useAppSelector((state) => state.projectFilter);
  const [startDate, endDate] = filters.period;
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    fetchData((res) => dispatch(setData(res.data)));
  }, []);

  useEffect(() => {
    let filteredProjects = projects;

    if (filters.installation)
      filteredProjects = filteredProjects.filter(
        (project) => project.installation_id === filters.installation?.id
      );

    if (filters.period)
      filteredProjects = filteredProjects.filter((project) =>
        startDate
          ? new Date(project.start_date) >= new Date(startDate) &&
            (endDate ? new Date(project.start_date) <= new Date(endDate) : true)
          : true
      );

    if (filters.client)
      filteredProjects = filteredProjects.filter(
        (project) => project.client_id === filters.client?.id
      );

    setFilteredProjects(filteredProjects);
  }, [filters, projects]);

  return (
    <>
      <Filters />
      <ProjectsContainer>
        {filteredProjects.map((project) => (
          <ProjectCard key={`project_${project.id}`} project={project} />
        ))}
        <NewProject />
      </ProjectsContainer>
    </>
  );
};

export default ProjectsPage;
