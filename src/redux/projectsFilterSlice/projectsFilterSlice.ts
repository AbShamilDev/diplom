import { createSlice } from "@reduxjs/toolkit";
import { dataState } from "../dataSlice/dataSlice";

interface projectsFilterState {
  period: (null | Date)[];
  client: null | dataState["clients"][0];
  installation: null | dataState["installations"][0];
}

const state: projectsFilterState = {
  period: [null, null],
  client: null,
  installation: null,
};

const projectsFilterSlice = createSlice({
  name: "projectFilter",
  initialState: state,
  reducers: {
    setFilterPeriod: (state, action) => {
      state.period = action.payload;
    },
    setFilterClient: (state, action) => {
      state.client = action.payload;
    },
    setFilterInstallation: (state, action) => {
      state.installation = action.payload;
    },
  },
});

export default projectsFilterSlice.reducer;
export const { setFilterPeriod, setFilterClient, setFilterInstallation } =
  projectsFilterSlice.actions;
