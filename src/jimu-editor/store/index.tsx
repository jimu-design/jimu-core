import React, { createContext } from 'react';
import { ScopeStore } from './scope';
import { StageStore } from './stage';

const stores = {
  stageStore: new StageStore(),
  scopeStore: new ScopeStore(),
};
export const storesContext = createContext(stores);

export const StoreProvider = ({ children }) => {
  return (
    <storesContext.Provider value={stores}>{children}</storesContext.Provider>
  );
};
