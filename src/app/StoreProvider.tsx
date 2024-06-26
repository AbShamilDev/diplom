"use client";

import { Provider } from "react-redux";
import { FC, PropsWithChildren, useRef } from "react";
import { AppStore, makeStore } from "@/redux/store";

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
