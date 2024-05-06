import { axiosApp } from "@/axiosApp";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface dataState {
  instalations: {
    id: number;
    name: string;
    fst_specification_id: number;
    snd_specification_id: number;
    trd_specification_id: number;
  }[];
  specifications: {
    id: number;
    name: string;
    components: { id: number; quantity: number }[];
    department_id: number;
  }[];
  components: {
    id: number;
    name: string;
    description: string;
    cost: number;
    department_id: number;
    unit_id: number;
  }[];
  departments: { id: number; name: string }[];
  units: { id: number; name: string }[];
}

const initialState: dataState = {
  instalations: [],
  specifications: [],
  components: [],
  departments: [],
  units: [],
};

export const getComponents = createAsyncThunk("getComponents", async () => {
  return await axiosApp.get("/components").then((res) => res.data);
});

export const getSpecifications = createAsyncThunk(
  "getSpecifications",
  async () => {
    return await axiosApp.get("/specifications").then((res) => res.data);
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    setInstalations: (state, action) => {
      state.instalations = action.payload;
    },
    setSpecifications: (state, action) => {
      state.specifications = action.payload;
    },
    setComponents: (state, action) => {
      state.components = action.payload;
    },
    addInstalation: (state, action) => {
      state.instalations.push(action.payload);
    },
    addSpecification: (state, action) => {
      state.specifications.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComponents.fulfilled, (state, action) => {
      state.components = action.payload;
    });
    builder.addCase(getSpecifications.fulfilled, (state, action) => {
      state.specifications = action.payload;
    });
  },
});

export default dataSlice.reducer;
export const {
  setData,
  setInstalations,
  setSpecifications,
  setComponents,
  addInstalation,
  addSpecification,
} = dataSlice.actions;
