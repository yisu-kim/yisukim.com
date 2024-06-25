"use client";

import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Locale } from "@/utils/i18n";
import { Dictionary, getDictionary } from "@/utils/dictionaries";

type DictionaryContext = {
  dictionary: Dictionary;
  setDictionary: Dispatch<SetStateAction<Dictionary>>;
};

const DictionaryContext = createContext<DictionaryContext | undefined>(
  undefined,
);

export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

export type Props = Readonly<{
  lang: Locale;
}>;

export function DictionaryProvider({
  lang,
  children,
}: PropsWithChildren<Props>) {
  const [dictionary, setDictionary] = useState<Dictionary>({} as Dictionary);

  useEffect(() => {
    const loadDictionary = async (locale: Locale) => {
      const dict = await getDictionary(locale);
      setDictionary(dict);
    };

    (async () => await loadDictionary(lang))();
  }, [lang]);

  return (
    <DictionaryContext.Provider value={{ dictionary, setDictionary }}>
      {children}
    </DictionaryContext.Provider>
  );
}
