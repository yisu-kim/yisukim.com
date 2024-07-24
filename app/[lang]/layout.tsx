import { PropsWithChildren } from "react";

import { BASE_URL } from "@/utils/constants";
import { Locale, i18n } from "@/utils/i18n";
import { getDictionary } from "@/utils/dictionaries";
import { ThemeProvider } from "@/contexts/theme";
import Header from "@/components/header";
import Footer from "@/components/footer";

import { pretendard } from "@/assets/fonts";
import "@/app/globals.css";

export type RootStaticParams = Readonly<{
  params: { lang: Locale };
}>;

export default async function RootLayout({
  children,
  params: { lang },
}: PropsWithChildren<RootStaticParams>) {
  const {
    profile: { name },
    contact,
  } = await getDictionary(lang);

  return (
    <html lang={lang} className={pretendard.className}>
      <body className="mx-auto flex h-dvh max-w-screen-md flex-col overflow-y-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header lang={lang} creator={name} />
          <main className="grow">{children}</main>
          <Footer creator={name} contactLinkLabel={contact} />
        </ThemeProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params: { lang } }: RootStaticParams) {
  const {
    blog: { author, description },
  } = await getDictionary(lang);
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: author,
      template: `%s | ${author}`,
    },
    description,
    openGraph: {
      images: `/static/profile.png`,
    },
  };
}
