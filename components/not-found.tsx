import Link from "next/link";

import { Locale } from "@/utils/i18n";
import { getDictionary } from "@/utils/dictionaries";

type Props = Readonly<{
  lang: Locale;
}>;

export default async function NotFound({ lang }: Props) {
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
