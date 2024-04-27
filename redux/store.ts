import { Middleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice/dataSlice";

const rootReducer = combineReducers({
  dataSlice: dataSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
