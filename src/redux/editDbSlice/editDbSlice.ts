import { createSlice } from "@reduxjs/toolkit";
import { TabsProps } from "@/app/database/_components/Tabs/Tabs";

interface editSlice {
  isFill: boolean;
  editId: number | null;
  isLoading: boolean;
  departmentFilter: number;
  tab: TabsProps["tab"];
  password: string;
  login: boolean;
}

const state: editSlice = {
  tab: "Установки",
  isFill: false,
  isLoading: false,
  editId: null,
  departmentFilter: 3,
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
    setDepartmentFilter: (state, action) => {
      state.departmentFilter = action.payload;
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
  setDepartmentFilter,
  setEditId,
  setPassword,
  setLogin,
} = editDbSlice.actions;
