import { NoMarginSelect } from "@/app/database/_components/TableEditors/TableEditors.style";
import * as SC from "./Сriteria.style";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { projectInfo } from "../../NewProject";
import { useAppSelector } from "@/redux/storeHooks";
import { DatePicker } from "@/app/projects/_components/PeriodFilter/PeriodFilter.style";
import { isArray } from "util";
import { dataState } from "@/redux/dataSlice/dataSlice";

interface Props {
  projectInfo: projectInfo;
  setProjectInfo: Dispatch<SetStateAction<projectInfo>>;
}

const Criteria: FC<Props> = ({ setProjectInfo, projectInfo }) => {
  const { installations, specifications, components, clients } = useAppSelector(
    (state) => state.dataSlice
  );

  const onChangeHandler = (ev: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    switch (ev.target.name) {
      case "client":
        setProjectInfo({ ...projectInfo, client_id: +ev.target.value });
        break;

      case "budget":
        setProjectInfo({
          ...projectInfo,
          budget:
            ev.target.value === ""
              ? undefined
              : parseInt(ev.target.value.toString().replace(/^0+/, "")),
        });
        break;

      case "installation":
        if (ev.target.value !== "") {
          const installation = installations.find((el) => el.id === +ev.target.value);
          const getSpec = (spec_id: number | undefined) => {
            const specification = specifications.find((el) => el.id === spec_id);
            return {
              id: spec_id,
              name: specification?.name,
              edited: false,
              components: specification?.components.map((el) => {
                return {
                  quantity: el.quantity,
                  ...components.filter((comp) => comp.id === +el.id)[0],
                };
              }),
            };
          };
          setProjectInfo({
            installation: installation,
            budget: projectInfo?.budget,
            client_id: projectInfo?.client_id,
            fst_spec: getSpec(installation?.fst_specification_id),
            snd_spec: getSpec(installation?.snd_specification_id),
            trd_spec: getSpec(installation?.trd_specification_id),
            start_date: projectInfo.start_date,
          });
        } else
          setProjectInfo({
            installation: undefined,
            fst_spec: { id: undefined, components: undefined, edited: false },
            snd_spec: { id: undefined, components: undefined, edited: false },
            trd_spec: { id: undefined, components: undefined, edited: false },
            budget: 0,
            client_id: 0,
            start_date: projectInfo.start_date,
          });
      default:
        break;
    }
  };

  return (
    <SC.ProjectDatasContainer>
      <SC.DataContainer>
        <SC.HelperText>Установка:</SC.HelperText>
        <NoMarginSelect
          onChange={onChangeHandler}
          value={projectInfo.installation?.id || ""}
          name="installation"
          required
        >
          <option value="">Выберите установку</option>
          {installations.map((installation) => (
            <option key={installation.id} value={installation.id}>
              {installation.name}
            </option>
          ))}
        </NoMarginSelect>
      </SC.DataContainer>

      {projectInfo.installation ? (
        <>
          <SC.DataContainer>
            <SC.HelperText>Заказчик:</SC.HelperText>
            <NoMarginSelect
              onChange={onChangeHandler}
              value={projectInfo.client_id || ""}
              name="client"
              required
            >
              <option value="">Выберите заказчика</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </NoMarginSelect>
          </SC.DataContainer>

          <SC.DataContainer>
            <SC.HelperText>Бюджет:</SC.HelperText>
            <SC.DataInput
              type="number"
              name="budget"
              value={projectInfo.budget}
              min={1}
              onChange={onChangeHandler}
              required
            />
          </SC.DataContainer>

          <SC.DataContainer>
            <SC.HelperText>Дата начала:</SC.HelperText>
            <DatePicker
              showIcon
              required
              selected={projectInfo.start_date}
              dateFormat={"dd.MM.yyyy"}
              onChange={(date) => {
                setProjectInfo({
                  ...projectInfo,
                  start_date: date ? (!isArray(date) ? date : date[0]) : projectInfo.start_date,
                });
              }}
            />
          </SC.DataContainer>
        </>
      ) : null}
    </SC.ProjectDatasContainer>
  );
};

export default Criteria;
