import { PropsWithChildren } from "react";

import { BASE_URL } from "@/utils/constants";
import { Locale, i18n } from "@/utils/i18n";
import { getDictionary } from "@/utils/dictionaries";
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
      <body className="mx-auto flex h-dvh max-w-screen-md flex-col overflow-y-auto">
        <Header lang={lang} creator={name} toggleButtonLabel={toggle} />
        <main className="grow">{children}</main>
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
  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    openGraph: {
      images: `/static/profile.png`,
    },
  };
}
