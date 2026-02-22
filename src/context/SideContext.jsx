import { createContext, useContext, useState, useEffect } from 'react';

const SideContext = createContext();

export function SideProvider({ children }) {
  const [side, setSide] = useState(() => localStorage.getItem('weddingSide') || null);

  useEffect(() => {
    if (side) localStorage.setItem('weddingSide', side);
  }, [side]);

  return (
    <SideContext.Provider value={{ side, setSide }}>
      {children}
    </SideContext.Provider>
  );
}

export function useSide() {
  return useContext(SideContext);
}
