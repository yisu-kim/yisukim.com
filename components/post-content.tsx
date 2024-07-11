import Image from "next/image";

import { Locale } from "@/utils/i18n";
import { dateFormatOptions } from "@/utils/date";
import { getPost } from "@/db/post";
import { CustomMDX } from "./mdx";

type Props = Readonly<{
  lang: Locale;
  slug: string;
}>;

export default async function PostContent({ lang, slug }: Props) {
  const post = await getPost(lang, slug);
  if (!post) {
    return;
  }

  const {
    content,
    metadata: { title, createdAt, thumbnail },
  } = post;

  return (
    <article className="prose prose-quoteless max-w-full p-4">
      <Image
        className="mb-6 w-full rounded-xl border"
        alt={title}
        src={`/static/posts/${slug}/${thumbnail}`}
        width={1200}
        height={630}
        priority
      />
      <section className="flex flex-col">
        <h1>{title}</h1>
        <time className="self-end text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString(lang, dateFormatOptions)}
        </time>
        <hr className="mt-6" />
        <div className="prose-img:mx-auto">
          <CustomMDX source={content} />
        </div>
        <hr />
      </section>
    </article>
  );
}
