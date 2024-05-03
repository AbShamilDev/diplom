"use client";

import { useAppDispatch, useAppSelector } from "../../../redux/storeHooks";
import Tabs, { TabsProps } from "./_components/Tabs/Tabs";
import * as SC from "./page.style";
import { setData } from "../../../redux/dataSlice/dataSlice";
import { useEffect, useState } from "react";
import axiosApp from "../../../axios";
import {
  setEditId,
  setIsFill,
  setTab,
} from "../../../redux/editDbSlice/editDbSlice";

const DataBasePage = () => {
  const tabs: TabsProps["tab"][] = ["Установки", "Спецификации"];
  const { editId, isFill, tab } = useAppSelector((state) => state.editSlice);
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    await axiosApp
      .get("/getall")
      .then((res) => dispatch(setData(res.data)))
      .catch((err) => console.error(err));
  };

  const onClickTab = (tabName: TabsProps["tab"]) => {
    if (editId !== null || isFill)
      if (confirm("Несохраненные изменения будут утеряны, вы уверены?")) {
        dispatch(setEditId(null));
        dispatch(setIsFill(false));
        dispatch(setTab(tabName));
      } else {
      }
    else dispatch(setTab(tabName));
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
          onClick={() => onClickTab(el)}
        >
          {el}
        </SC.tabDiv>
      ))}

      <Tabs tab={tab} />
    </SC.mainDiv>
  );
};

export default DataBasePage;
