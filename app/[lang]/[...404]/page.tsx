import { i18n } from "@/utils/i18n";
import { RootStaticParams } from "@/app/[lang]/layout";
import NotFound from "@/components/not-found";

type NotFoundStaticParams = RootStaticParams &
  Readonly<{ params: { notFound: any } }>;

export default async function NotFoundPage({
  params: { lang },
}: NotFoundStaticParams) {
  return <NotFound lang={lang} />;
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
