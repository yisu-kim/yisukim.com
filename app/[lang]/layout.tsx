import { PropsWithChildren } from "react";

import { Locale, i18n } from "@/i18n";
import { getDictionary } from "@/dictionaries";
import { DictionaryProvider } from "@/contexts/dictionary-context";
import Header from "@/components/header";
import Footer from "@/components/footer";

import "@/app/globals.css";
import { pretendard } from "@/assets/fonts";

export type RootStaticParams = Readonly<{
  params: { lang: Locale };
}>;

export default async function RootLayout({
  children,
  params: { lang },
}: PropsWithChildren<RootStaticParams>) {
  const {
    profile: { name },
    language: { toggle },
    contact,
  } = await getDictionary(lang);

  return (
    <html lang={lang} className={pretendard.className}>
      <body className="h-dvh overflow-y-auto flex flex-col max-w-screen-md mx-auto">
        <Header lang={lang} creator={name} toggleButtonLabel={toggle} />
        <main className="grow">
          <DictionaryProvider lang={lang}>{children}</DictionaryProvider>
        </main>
        <Footer creator={name} contactLinkLabel={contact} />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params: { lang } }: RootStaticParams) {
  const {
    blog: { title, description },
  } = await getDictionary(lang);
  return { title, description };
}
