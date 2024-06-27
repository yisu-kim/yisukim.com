export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ko"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

/**
 * Only English and Korean are supported. This is not expected to change in the near future.
 */
export function getTheOtherLocale(lang: Locale) {
  const locale = i18n.locales.find((locale) => locale !== lang);
  if (!locale) {
    throw new Error(`The locale named ${lang} cannot be found.`);
  }

  return locale;
}
