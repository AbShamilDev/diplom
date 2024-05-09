import { axiosApp } from "@/axiosApp";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface dataState {
  installations: {
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
    alternatives: number[];
    department_id: number;
    unit_id: number;
  }[];
  departments: { id: number; name: string }[];
  units: { id: number; name: string }[];
}

const initialState: dataState = {
  installations: [],
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

export const getInstallations = createAsyncThunk(
  "getInstallations",
  async () => {
    return await axiosApp.get("/installations").then((res) => res.data);
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    setinstallations: (state, action) => {
      state.installations = action.payload;
    },
    setSpecifications: (state, action) => {
      state.specifications = action.payload;
    },
    setComponents: (state, action) => {
      state.components = action.payload;
    },
    addInstalation: (state, action) => {
      state.installations.push(action.payload);
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
    builder.addCase(getInstallations.fulfilled, (state, action) => {
      state.installations = action.payload;
    });
  },
});

export default dataSlice.reducer;
export const {
  setData,
  setinstallations,
  setSpecifications,
  setComponents,
  addInstalation,
  addSpecification,
} = dataSlice.actions;
