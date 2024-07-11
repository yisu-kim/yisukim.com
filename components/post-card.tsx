import Link from "next/link";
import Image from "next/image";

import { Locale } from "@/utils/i18n";
import { dateFormatOptions } from "@/utils/date";
import { Metadata } from "@/db/post";

type Props = Readonly<{
  lang: Locale;
  slug: string;
  metadata: Metadata;
}>;

export default function PostCard({
  lang,
  slug,
  metadata: { title, description, createdAt, thumbnail },
}: Props) {
  return (
    <Link href={`/${lang}/posts/${slug}`}>
      <article className="h-full rounded-lg border p-4">
        <div className="flex h-full flex-col gap-4">
          <Image
            className="w-full rounded-lg border"
            src={`/static/posts/${slug}/${thumbnail}`}
            alt={title}
            width={400}
            height={210}
          />
          <div className="flex grow flex-col">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-1 w-full grow text-gray-500">{description}</p>
            <time className="mt-4 self-end text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString(lang, dateFormatOptions)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}
