"use client";

import Link from "next/link";

import { useDictionary } from "@/contexts/dictionary-context";
import { RootStaticParams } from "@/app/[lang]/layout";

type NotFoundStaticParams = RootStaticParams &
  Readonly<{ params: { notFound: any } }>;

export default function NotFound({ params: { lang } }: NotFoundStaticParams) {
  const {
    dictionary: { notFound },
  } = useDictionary();
  const { title, description, redirectText } = notFound ?? {};

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
