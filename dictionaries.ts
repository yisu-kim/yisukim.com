import { Locale } from "@/i18n";

export type Dictionary = {
  profile: {
    name: string;
  };
  blog: {
    title: string;
    description: string;
  };
  notFound: {
    title: string;
    description: string;
    redirectText: string;
  };
};

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ko: () => import("@/dictionaries/ko.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
