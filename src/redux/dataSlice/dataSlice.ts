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
  projects: [],
  installations: [],
  specifications: [],
  components: [],
  departments: [],
  units: [],
  clients: [],
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
