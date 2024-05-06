import { createSlice } from "@reduxjs/toolkit";
import { dataState } from "../dataSlice/dataSlice";
import { TabsProps } from "@/app/database/_components/Tabs/Tabs";

interface editSlice {
  isFill: boolean;
  editId: number | null;
  isLoading: boolean;
  tab: TabsProps["tab"];
  password: string;
  login: boolean;
}

const state: editSlice = {
  tab: "Установки",
  isFill: false,
  isLoading: false,
  editId: null,
  password: "",
  login: false,
};

const editDbSlice = createSlice({
  name: "editSlice",
  initialState: state,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    setIsFill: (state, action) => {
      state.isFill = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});
export default editDbSlice.reducer;
export const {
  setTab,
  setIsFill,
  setIsLoading,
  setEditId,
  setPassword,
  setLogin,
} = editDbSlice.actions;
