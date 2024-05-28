import { SetStateAction } from "react";
import { createSlice } from "@reduxjs/toolkit";

interface projectsFilterState {
  filter_period: (null | Date)[];
}

const state: projectsFilterState = {
  filter_period: [null, null],
};

const projectsFilterSlice = createSlice({
  name: "projectFilter",
  initialState: state,
  reducers: {
    setFilterPeriod: (state, action) => {
      state.filter_period = action.payload;
    },
  },
});

export default projectsFilterSlice.reducer;
export const { setFilterPeriod } = projectsFilterSlice.actions;
