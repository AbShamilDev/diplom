import { ClassicWrapper } from "@/app/_components/ClassicWrapper/ClassicWrapper";
import { dataState } from "@/redux/dataSlice/dataSlice";
import { FC } from "react";
import * as SC from "./ProjectCard.style";
import {
  CalculateInstallation,
  CalculateTotalCost,
  convertToCost,
} from "@/app/globalFcns";
import { useAppSelector } from "@/redux/storeHooks";

interface Props {
  project: dataState["projects"][0];
}

const ProjectCard: FC<Props> = ({ project }) => {
  const { installations, specifications, components } = useAppSelector(
    (state) => state.dataSlice
  );
  const installation = installations.filter(
    (i) => i.id === project.installation_id
  )[0];
  const date = new Date(project.start_date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <ClassicWrapper>
      <SC.CardContainer>
        <SC.CardInfoBlock>Дата начала: {date}</SC.CardInfoBlock>
        <SC.CardInfoBlock>Заказчик: {project.client}</SC.CardInfoBlock>
        <SC.CardInfoBlock>
          Бюджет: {convertToCost(project.budget)}
        </SC.CardInfoBlock>
        <SC.CardInfoBlock>
          Шаблон установки: {installation.name}
        </SC.CardInfoBlock>
        <SC.CardContainer>
          Стоимость:{" "}
          {convertToCost(
            CalculateInstallation(installation, specifications, components)
          )}
        </SC.CardContainer>
      </SC.CardContainer>
    </ClassicWrapper>
  );
};

export default ProjectCard;
