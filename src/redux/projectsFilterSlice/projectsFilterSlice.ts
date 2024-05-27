import { SetStateAction } from "react";
import { createSlice } from "@reduxjs/toolkit";

interface projectsFilterState {
  start_date?: Date;
  end_date?: Date;
}

const state: projectsFilterState = {};

const projectsFilterSlice = createSlice({
  name: "projectFilter",
  initialState: state,
  reducers: {
    setStartDate: (state, action) => {
      state.start_date = action.payload;
    },
    setEndDate: (state, action) => {
      state.end_date = action.payload;
    },
  },
});

export default projectsFilterSlice.reducer;
export const { setStartDate, setEndDate } = projectsFilterSlice.actions;
