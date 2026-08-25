import { createContext, useContext, useEffect, useState } from 'react';
import en from '../data/content.en';
import mr from '../data/content.mr';

const contents = { en, mr };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') === 'mr' ? 'mr' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // storage unavailable — language just won't persist
    }
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LanguageContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  return contents[useContext(LanguageContext).lang];
}
