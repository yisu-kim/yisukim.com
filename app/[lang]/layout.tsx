import { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { Locale, i18n } from "@/i18n";
import { getDictionary } from "@/dictionaries";
import { pretendard } from "@/ui/fonts";
import Header from "@/components/header";
import Footer from "@/components/footer";

import "@/app/globals.css";

type Props = Readonly<{
  params: { lang: Locale };
}>;

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params: { lang } }: Props) {
  const {
    blog: { title, description },
  } = await getDictionary(lang);
  return { title, description };
}

export default async function RootLayout({
  children,
  params: { lang },
}: PropsWithChildren<Props>) {
  const {
    profile: { name },
  } = await getDictionary(lang);

  return (
    <html lang={lang} className={pretendard.className}>
      <body className="h-dvh overflow-y-auto flex flex-col max-w-screen-md mx-auto">
        <Header lang={lang} creator={name} />
        <main className="grow">{children}</main>
        <Footer creator={name} />
      </body>
    </html>
  );
}
