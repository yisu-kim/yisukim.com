import Link from "next/link";
import Image from "next/image";

import { Locale } from "@/i18n";
import { dateFormatOptions } from "@/date-config";
import { Frontmatter } from "@/services/post-mdx";

type Props = Readonly<{
  lang: Locale;
  slug: string;
  frontmatter: Frontmatter;
}>;

export default function PostCard({
  lang,
  slug,
  frontmatter: { title, description, createdAt, thumbnail },
}: Props) {
  return (
    <Link href={`/${lang}/posts/${slug}`}>
      <article className="h-full border rounded-lg p-4">
        <div className="h-full flex flex-col gap-4">
          <Image
            className="w-full rounded-lg border"
            src={`/static/posts/${slug}/${thumbnail}`}
            alt={title}
            width={400}
            height={210}
          />
          <div className="grow flex flex-col">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="w-full grow mt-1 text-gray-500">{description}</p>
            <time className="self-end mt-4 text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString(lang, dateFormatOptions)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}
