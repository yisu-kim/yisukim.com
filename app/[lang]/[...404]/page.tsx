import Link from "next/link";

import { getDictionary } from "@/dictionaries";
import { Locale } from "@/i18n";

type Props = Readonly<{
  params: { lang: Locale };
}>;

export default async function NotFound({ params: { lang } }: Props) {
  const {
    notFound: { title, description, redirectText },
  } = await getDictionary(lang);

  return (
    <section className="prose h-full flex flex-col items-center justify-center p-4 text-center">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
        <Link href={`/${lang}`}>{redirectText}</Link>
      </p>
    </section>
  );
}
