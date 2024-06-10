import { ClassicWrapper } from "@/app/_components/ClassicWrapper/ClassicWrapper";
import { dataState } from "@/redux/dataSlice/dataSlice";
import { FC, useRef, useState } from "react";
import * as SC from "./ProjectCard.style";
import { CalculateInstallation, convertToCost } from "@/app/globalFcns";
import { useAppSelector } from "@/redux/storeHooks";
import ProjectTable from "../NewProject/_components/ProjectTable/ProjectTable";
import { TablesBlock } from "../NewProject/NewProject.style";
import { SpanGrayButton } from "@/app/database/_components/DataTables/DataTable.style";
import { Button } from "@/app/database/_components/Tabs/Tabs.style";

interface Props {
  project: dataState["projects"][0];
}

const ProjectCard: FC<Props> = ({ project }) => {
  const [expand, setExpand] = useState(false);
  const tablesRef = useRef<HTMLDivElement>(null);

  const { installations, specifications, components, clients } = useAppSelector(
    (state) => state.dataSlice
  );

  const installation = installations.filter(
    (i) => i.id === project.installation_id
  )[0];

  const client = clients.filter((client) => client.id === project.client_id)[0];

  const date = new Date(project.start_date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const GetComponentsWithQnt = (
    specifications: dataState["specifications"],
    components: dataState["components"],
    id: number
  ) =>
    specifications
      .filter((spec) => spec.id === id)[0]
      .components.map((comp) => {
        return {
          ...components.filter((compp) => +comp.id === compp.id)[0],
          quantity: comp.quantity,
        };
      });

  return (
    <ClassicWrapper>
      <SC.CardContainer>
        <SC.CardInfoBlock>
          <SC.MainText>Проект №{project.id}</SC.MainText>
          <SC.MiddleText>
            Используемая установка: {installation.name}
          </SC.MiddleText>
        </SC.CardInfoBlock>
        <SC.CardInfoBlock style={{ alignItems: "end" }}>
          <SC.MainText>Заказчик: {client.name}</SC.MainText>
          <SC.MiddleText>Дата начала: {date}</SC.MiddleText>
          <SC.MiddleText>Бюджет: {convertToCost(project.budget)}</SC.MiddleText>
          <SC.MiddleText>
            Стоимость:{" "}
            {convertToCost(
              CalculateInstallation(installation, specifications, components)
            )}
          </SC.MiddleText>
        </SC.CardInfoBlock>
      </SC.CardContainer>
      <TablesBlock
        ref={tablesRef}
        height={expand ? tablesRef.current?.scrollHeight : 0}
      >
        <ProjectTable
          name="fst_spec"
          spec_components={GetComponentsWithQnt(
            specifications,
            components,
            installation.fst_specification_id
          )}
        />
        <ProjectTable
          name="snd_spec"
          spec_components={GetComponentsWithQnt(
            specifications,
            components,
            installation.snd_specification_id
          )}
        />
        <ProjectTable
          name="trd_spec"
          spec_components={GetComponentsWithQnt(
            specifications,
            components,
            installation.trd_specification_id
          )}
        />
        <Button style={{ backgroundColor: "#04713a", width: "fit-content" }}>
          Сохранить в Excel
        </Button>
      </TablesBlock>
      <SpanGrayButton
        onClick={() => setExpand(!expand)}
        style={{ position: "static" }}
      >
        {expand ? "Свернуть" : "Развернуть"}
      </SpanGrayButton>
    </ClassicWrapper>
  );
};

export default ProjectCard;
