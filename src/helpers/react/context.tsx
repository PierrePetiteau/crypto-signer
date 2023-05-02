import React, { PropsWithChildren } from "react";

function createContext<T, P>(Context: (props: P) => T) {
  const context = React.createContext(undefined) as unknown as React.Context<T>;

  const useContext = (): T => {
    const ctx = React.useContext(context);
    if (ctx === undefined) {
      throw new Error("useContext must be used within a provider");
    }
    return ctx;
  };

  const Provider = (props: PropsWithChildren<P>) => {
    const { children, ...contextProps } = props;
    const value = Context(contextProps as P);
    return <context.Provider value={value}>{children}</context.Provider>;
  };

  return [Provider, useContext] as const;
}

export default createContext;
