import { Locale } from "@/utils/i18n";

export type Dictionary = {
  profile: {
    name: string;
  };
  blog: {
    author: string;
    description: string;
  };
  page: {
    posts: string;
  };
  notFound: {
    title: string;
    description: string;
    redirectText: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
};

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  ko: () => import("./ko.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
