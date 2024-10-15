"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Locale } from "@/utils/i18n";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { StatusBadge } from "@/components/status-badge";

type Props = Readonly<{
  lang: Locale;
  creator: string;
}>;

export default function Header({ lang, creator }: Props) {
  const pathname = usePathname();

  const showLanguageToggle =
    isHomePage(lang, pathname) || isPostsPage(lang, pathname);

  return (
    <header className="mb-4 flex w-full items-center justify-between border-b p-4">
      <div className="flex items-center gap-4">
        <Link href={`/${lang}`}>
          <h1 className="text-2xl font-bold">{creator}</h1>
        </Link>
        <StatusBadge />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {showLanguageToggle && <LanguageToggle lang={lang} />}
      </div>
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
