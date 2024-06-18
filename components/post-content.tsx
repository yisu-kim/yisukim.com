import Image from "next/image";

import { PostData } from "@/services/posts";

type Props = {
  slug: string;
  post: PostData;
};

export default function PostContent({ slug, post }: Props) {
  const {
    content,
    frontmatter: { title, date, thumbnail },
  } = post;

  return (
    <article className="prose prose-quoteless max-w-full p-4">
      {thumbnail && (
        <Image
          className="w-full mb-6 rounded-xl border"
          alt={title}
          src={`/posts/${slug}/${thumbnail}`}
          width={1200}
          height={600}
        />
      )}
      <section className="flex flex-col">
        <h1>{title}</h1>
        <time className="self-end text-sm text-gray-500">
          {date.toString()}
        </time>
        <hr className="mt-6" />
        {content}
        <hr />
      </section>
    </article>
  );
}
