"use client";

import { Provider } from "react-redux";
import { AppStore, makeStore } from "../../redux/store";
import { FC, PropsWithChildren, useRef } from "react";

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
