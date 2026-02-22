import { createContext, useContext, useState } from 'react';

const SideContext = createContext();

export function SideProvider({ children }) {
  const [side, setSide] = useState(null);

  return (
    <SideContext.Provider value={{ side, setSide }}>
      {children}
    </SideContext.Provider>
  );
}

export function useSide() {
  return useContext(SideContext);
}
