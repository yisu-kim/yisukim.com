"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { Language } from "@/assets/icons/language";
import { Locale, getTheOtherLocale } from "@/utils/i18n";

type Props = Readonly<{
  lang: Locale;
  creator: string;
  toggleButtonLabel: string;
}>;

export default function Header({ lang, creator, toggleButtonLabel }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const showLocaleButton =
    isHomePage(lang, pathname) || isPostsPage(lang, pathname);

  function toggleLocale() {
    const newLocale = getTheOtherLocale(lang);
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");
    router.push(newPathname);
  }

  return (
    <header className="flex w-full items-center justify-between px-6 py-4">
      <Link href={`/${lang}`}>
        <h1 className="text-2xl font-bold">{creator}</h1>
      </Link>
      {showLocaleButton && (
        <button
          aria-label={toggleButtonLabel}
          className="rounded-lg border p-1 hover:bg-gray-100"
          onClick={toggleLocale}
        >
          <Language width="1.4em" height="1.4em" className="text-gray-500" />
        </button>
      )}
    </header>
  );
}

function isHomePage(lang: Locale, pathname: string): boolean {
  const regex = new RegExp(`^\/${lang}$`);
  return regex.test(pathname);
}

function isPostsPage(lang: Locale, pathname: string): boolean {
  const regex = new RegExp(`^\/${lang}\/posts$`);
  return regex.test(pathname);
}
