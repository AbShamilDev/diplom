import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice/dataSlice";
import editDbSlice from "./editDbSlice/editDbSlice";

const rootReducer = combineReducers({
  dataSlice: dataSlice,
  editSlice: editDbSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
