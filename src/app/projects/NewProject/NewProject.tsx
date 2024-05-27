"use client";
import { ClassicWrapper } from "@/app/_components/ClassicWrapper/ClassicWrapper";
import * as SC from "./NewProject.style";
import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { dataState, getProjects } from "@/redux/dataSlice/dataSlice";
import { convertToCost } from "@/app/globalFcns";
import ProjectTable from "./_components/ProjectTable/ProjectTable";
import { Button } from "@/app/database/_components/Tabs/Tabs.style";
import Criteria from "./_components/Сriteria/Сriteria";
import { axiosApp } from "@/axiosApp";
import Image from "next/image";

export interface ComponentWithQuantity
  extends Pick<dataState["components"][0], keyof dataState["components"][0]> {
  quantity: number;
}

export interface projectInfo {
  installation?: dataState["installations"][0];
  fst_spec: {
    edited: boolean;
    id?: number;
    name?: string;
    components?: ComponentWithQuantity[];
  };
  snd_spec: {
    edited: boolean;
    id?: number;
    components?: ComponentWithQuantity[];
  };
  trd_spec: {
    edited: boolean;
    id?: number;
    components?: ComponentWithQuantity[];
  };
  budget?: number;
  client: string;
  start_date: Date | null | undefined;
}

const NewProject = () => {
  const { components } = useAppSelector((state) => state.dataSlice);
  const [projectInfo, setProjectInfo] = useState<projectInfo>({
    fst_spec: { edited: false },
    snd_spec: { edited: false },
    trd_spec: { edited: false },
    client: "",
    budget: 1,
    start_date: new Date(),
  });
  const [totalCost, setTotalCost] = useState<number>(0);
  const tablesRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const resetProjectInfo = () => {
    setProjectInfo({
      installation: undefined,
      fst_spec: { edited: false },
      snd_spec: { edited: false },
      trd_spec: { edited: false },
      client: "",
      start_date: new Date(),
    });
  };

  const onSelectAlternative = (
    ev: ChangeEvent<HTMLSelectElement>,
    oldId: number,
    newId: number
  ) => {
    const getSpec = (
      spec: projectInfo["fst_spec" | "snd_spec" | "trd_spec"]
    ) => {
      const newComponent = components.filter((comp) => comp.id === newId)[0];
      return {
        ...spec,
        edited: true,
        components: spec.components?.map((el) =>
          el.id === oldId ? { ...el, ...newComponent } : el
        ),
      };
    };

    switch (ev.target.name) {
      case "fst_spec":
        setProjectInfo({
          ...projectInfo,
          fst_spec: getSpec(projectInfo.fst_spec),
        });
        break;
      case "snd_spec":
        setProjectInfo({
          ...projectInfo,
          snd_spec: getSpec(projectInfo.snd_spec),
        });
        break;
      case "trd_spec":
        setProjectInfo({
          ...projectInfo,
          trd_spec: getSpec(projectInfo.trd_spec),
        });
        break;
      default:
        break;
    }
  };

  const CalculateTotalProject = (projectInfo: projectInfo) => {
    const CalculateTotalSpec = (
      components: ComponentWithQuantity[] | undefined
    ) => components?.reduce((acc, cur) => acc + cur.cost * cur.quantity, 0);

    const fst_cost = CalculateTotalSpec(projectInfo.fst_spec.components);
    const snd_cost = CalculateTotalSpec(projectInfo.snd_spec.components);
    const trd_cost = CalculateTotalSpec(projectInfo.trd_spec.components);

    return (
      (fst_cost ? fst_cost : 0) +
      (snd_cost ? snd_cost : 0) +
      (trd_cost
        ? projectInfo?.installation?.two_lines
          ? trd_cost * 2
          : trd_cost
        : 0)
    );
  };

  const onClickMinimalHandle = () => {
    const getMinimalSpec = (
      spec: projectInfo["fst_spec" | "snd_spec" | "trd_spec"]
    ) => {
      let edited = spec.edited;
      const resultSpec = {
        ...spec,
        components: spec.components?.map((comp) => {
          let minComponent: ComponentWithQuantity = comp;
          comp.alternatives.forEach((altId) => {
            const altComponent = components.filter(
              (comp) => comp.id === +altId
            )[0];
            if (altComponent.cost < +minComponent.cost) {
              if (!edited) edited = true;
              minComponent = {
                quantity: minComponent.quantity,
                ...altComponent,
              };
            }
          });
          return minComponent;
        }),
        edited: edited,
      };
      return resultSpec;
    };
    setProjectInfo({
      ...projectInfo,
      fst_spec: getMinimalSpec(projectInfo.fst_spec),
      snd_spec: getMinimalSpec(projectInfo.snd_spec),
      trd_spec: getMinimalSpec(projectInfo.trd_spec),
    });
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    await axiosApp
      .post("/projects", null, { params: projectInfo })
      .then(() => {
        dispatch(getProjects());
        resetProjectInfo();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setTotalCost(CalculateTotalProject(projectInfo));
  }, [projectInfo]);

  return (
    <ClassicWrapper>
      <SC.CloseButton
        style={
          projectInfo.installation
            ? { opacity: "100%" }
            : { opacity: "0", pointerEvents: "none" }
        }
        onClick={() => resetProjectInfo()}
      >
        <Image src={"/images/cross.svg"} alt="" width={25} height={25} />
      </SC.CloseButton>
      <SC.ProjectHeader>
        <SC.TopText>Создание нового проекта</SC.TopText>
      </SC.ProjectHeader>
      <SC.MainBlock>
        <SC.TablesBlock
          ref={tablesRef}
          height={
            projectInfo.installation ? tablesRef.current?.scrollHeight : 0
          }
        >
          <ProjectTable
            spec_components={projectInfo.fst_spec.components}
            name="fst_spec"
            onSelectAlternative={onSelectAlternative}
          />
          <ProjectTable
            spec_components={projectInfo.snd_spec.components}
            name="snd_spec"
            onSelectAlternative={onSelectAlternative}
          />
          <ProjectTable
            spec_components={projectInfo.trd_spec.components}
            name="trd_spec"
            onSelectAlternative={onSelectAlternative}
          />
        </SC.TablesBlock>

        <SC.SettingForm onSubmit={onSubmit} expand={!!projectInfo.installation}>
          <Criteria projectInfo={projectInfo} setProjectInfo={setProjectInfo} />
          {projectInfo.installation && (
            <>
              <SC.FooterContainer>
                {"Общая цена: "}
                <SC.Cost
                  isTooMuch={
                    projectInfo.budget ? totalCost > projectInfo.budget : true
                  }
                >
                  {convertToCost(totalCost)}
                </SC.Cost>
              </SC.FooterContainer>
              {projectInfo.budget && totalCost > projectInfo.budget ? (
                <Button type="button" onClick={() => onClickMinimalHandle()}>
                  Минимальная конфигурация
                </Button>
              ) : (
                <Button type="submit">Создать проект</Button>
              )}
            </>
          )}
        </SC.SettingForm>
      </SC.MainBlock>
      <SC.ProjectFooter>
        <SC.FooterContainer></SC.FooterContainer>
      </SC.ProjectFooter>
    </ClassicWrapper>
  );
};

export default NewProject;
