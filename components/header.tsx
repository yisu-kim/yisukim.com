import Link from "next/link";

import { Locale } from "@/i18n-config";

type Props = {
  lang: Locale;
};

export default function Header({ lang }: Props) {
  return (
    <header className="flex items-center p-4">
      <Link href={`/${lang}`}>
        <h1 className="text-2xl font-bold">Yisu Kim</h1>
      </Link>
    </header>
  );
}
