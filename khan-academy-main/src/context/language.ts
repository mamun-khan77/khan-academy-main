import { createContext } from 'react';

export type Lang = 'bn' | 'en';

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  pick: (bn: string, en: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
