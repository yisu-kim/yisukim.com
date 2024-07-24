"use client";

import { usePathname, useRouter } from "next/navigation";

import { Locale } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Language } from "@/assets/icons/language";

type Props = Readonly<{
  lang: Locale;
}>;

export function LanguageToggle({ lang }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function changeLang(lang: string) {
    const segments = pathname.split("/");
    segments[1] = lang;
    const newPathname = segments.join("/");
    router.push(newPathname);
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Language className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={lang} onValueChange={changeLang}>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ko">한국어</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
