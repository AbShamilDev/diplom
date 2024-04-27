"use client";

import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../redux/storeHooks";
import EntriesAccordion, { TabsProps } from "./_components/Tabs/Tabs";
import * as SC from "./page.style";
import { setData } from "../../../redux/dataSlice/dataSlice";
import { useEffect, useRef, useState } from "react";
import Tabs from "./_components/Tabs/Tabs";
import axiosApp from "../../../axios";

const DataBasePage = () => {
  const tabs: TabsProps["tab"][] = ["Установки", "Спецификации"];
  const [tab, setTab] = useState<TabsProps["tab"]>(tabs[0]);
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
    <SC.mainDiv>
      {tabs.map((el, i) => (
        <SC.tabDiv
          key={`tab_${i}`}
          offset={i}
          active={tab === el}
          onClick={() => setTab(el)}
        >
          {el}
        </SC.tabDiv>
      ))}

      <Tabs tab={tab} />
    </SC.mainDiv>
  );
};

export default DataBasePage;
