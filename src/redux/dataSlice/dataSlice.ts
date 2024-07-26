import { axiosApp } from "@/axios/axiosApp";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface dataState {
  projects: {
    id: number;
    client_id: number;
    installation_id: number;
    budget: number;
    start_date: string;
  }[];
  installations: {
    id: number;
    name: string;
    fst_specification_id: number;
    snd_specification_id: number;
    trd_specification_id: number;
    two_lines: boolean;
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
    link: string;
  }[];
  departments: { id: number; name: string }[];
  units: { id: number; name: string }[];
  clients: {
    id: number;
    name: string;
    phone_number?: string;
    email?: string;
  }[];
}

const initialState: dataState = {
  projects: [
    {
      id: 0,
      client_id: 1,
      installation_id: 1,
      budget: 10000,
      start_date: "",
    },
    {
      id: 1,
      client_id: 1,
      installation_id: 1,
      budget: 10000,
      start_date: "",
    },
    {
      id: 2,
      client_id: 1,
      installation_id: 1,
      budget: 10000,
      start_date: "",
    },
  ],
  installations: [
    {
      id: 1,
      name: "Test installation",
      fst_specification_id: 1,
      snd_specification_id: 2,
      trd_specification_id: 3,
      two_lines: false,
    },
  ],
  specifications: [
    {
      id: 1,
      name: "Test spec1",
      components: [{ id: 1, quantity: 10 }],
      department_id: 1,
    },
    {
      id: 2,
      name: "Test spec2",
      components: [{ id: 2, quantity: 10 }],
      department_id: 2,
    },
    {
      id: 3,
      name: "Test spec3",
      components: [{ id: 3, quantity: 10 }],
      department_id: 3,
    },
  ],
  components: [
    {
      id: 1,
      name: "Test comp1",
      description: "1",
      cost: 100,
      alternatives: [2],
      department_id: 1,
      unit_id: 1,
      link: "",
    },
    {
      id: 2,
      name: "Test comp2",
      description: "2",
      cost: 200,
      alternatives: [1],
      department_id: 1,
      unit_id: 1,
      link: "",
    },
    {
      id: 3,
      name: "Test comp3",
      description: "3",
      cost: 100,
      alternatives: [4],
      department_id: 2,
      unit_id: 1,
      link: "",
    },
    {
      id: 4,
      name: "Test comp4",
      description: "4",
      cost: 200,
      alternatives: [3],
      department_id: 2,
      unit_id: 1,
      link: "",
    },
    {
      id: 5,
      name: "Test comp5",
      description: "5",
      cost: 100,
      alternatives: [6],
      department_id: 3,
      unit_id: 1,
      link: "",
    },
    {
      id: 6,
      name: "Test comp6",
      description: "6",
      cost: 200,
      alternatives: [5],
      department_id: 3,
      unit_id: 1,
      link: "",
    },
  ],
  departments: [
    {
      id: 1,
      name: "АСУТП",
    },
    {
      id: 2,
      name: "Гидравлика",
    },
    {
      id: 3,
      name: "Блоки питания",
    },
  ],
  units: [
    {
      id: 1,
      name: "шт",
    },
    {
      id: 2,
      name: "л",
    },
  ],
  clients: [
    {
      id: 1,
      name: "Test client",
    },
  ],
};

export const getComponents = createAsyncThunk("getComponents", async () => {
  return await axiosApp.get("/components").then((res) => res.data);
});

export const getSpecifications = createAsyncThunk("getSpecifications", async () => {
  return await axiosApp.get("/specifications").then((res) => res.data);
});

export const getInstallations = createAsyncThunk("getInstallations", async () => {
  return await axiosApp.get("/installations").then((res) => res.data);
});

export const getProjects = createAsyncThunk("getProjects", async () => {
  return await axiosApp.get("/projects").then((res) => res.data);
});

export const getClients = createAsyncThunk("getClients", async () => {
  return await axiosApp.get("/clients").then((res) => res.data);
});

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
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    });
    builder.addCase(getClients.fulfilled, (state, action) => {
      state.clients = action.payload;
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
