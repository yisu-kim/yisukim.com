import Link from "next/link";

import { i18n } from "@/utils/i18n";
import { getDictionary } from "@/utils/dictionaries";
import { RootStaticParams } from "@/app/[lang]/layout";

type NotFoundStaticParams = RootStaticParams &
  Readonly<{ params: { notFound: any } }>;

export default async function NotFound({
  params: { lang },
}: NotFoundStaticParams) {
  const {
    notFound: { title, description, redirectText },
  } = await getDictionary(lang);

  return (
    <section className="prose flex h-full max-w-full flex-col items-center justify-center p-4 text-center">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
        <Link href={`/${lang}`}>{redirectText}</Link>
      </p>
    </section>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
