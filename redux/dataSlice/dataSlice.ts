import { createSlice } from "@reduxjs/toolkit";

export interface initialState {
  instalations: { id: number; name: string; specifications: number[] }[];
  specifications: {
    id: number;
    name: string;
    components: number[];
    departament_id: number;
  }[];
  components: {
    id: number;
    name: string;
    description: string;
    unit_id: number;
    cost: number;
  }[];
  departaments: { id: number; name: string }[];
  units: { id: number; name: string }[];
}

const initialState: initialState = {
  instalations: [],
  specifications: [],
  components: [],
  departaments: [],
  units: [],
};

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
    setDepartaments: (state, action) => {
      state.departaments = action.payload;
    },
    setUnits: (state, action) => {
      state.units = action.payload;
    },
    addInstalation: (state, action) => {
      state.instalations.push(action.payload);
    },
    addSpecification: (state, action) => {
      state.specifications.push(action.payload);
    },
    addComponent: (state, action) => {
      state.components.push(action.payload);
    },
    addDepartament: (state, action) => {
      state.departaments.push(action.payload);
    },
    addUnit: (state, action) => {
      state.units.push(action.payload);
    },
  },
});

export default dataSlice.reducer;
export const {
  setData,
  setInstalations,
  setSpecifications,
  setComponents,
  setDepartaments,
  setUnits,
  addInstalation,
  addSpecification,
  addComponent,
  addDepartament,
  addUnit,
} = dataSlice.actions;
