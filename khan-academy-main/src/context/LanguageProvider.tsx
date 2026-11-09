import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { LanguageContext, type Lang } from '@/context/language';

const STORAGE_KEY = 'khan-academy-lang';

function readInitialLang(): Lang {
  return window.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'bn';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  const setLang = useCallback((next: Lang) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === 'bn' ? 'bn' : 'en';
    setLangState(next);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      pick: (bn: string, en: string) => (lang === 'bn' ? bn : en),
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
