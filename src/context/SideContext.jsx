import { createContext, useContext, useEffect, useState } from 'react';

const SideContext = createContext();

export function SideProvider({ children }) {
  const [side, setSide] = useState(null);

  // The side's theme is scoped by a class on <html> (see theme.css)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('side-groom', side === 'groom');
    root.classList.toggle('side-bride', side === 'bride');
  }, [side]);

  return (
    <SideContext.Provider value={{ side, setSide }}>
      {children}
    </SideContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSide() {
  return useContext(SideContext);
}
