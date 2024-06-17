import Image from "next/image";

import { SerializedPost } from "@/service/posts";
import MdxViewer from "@/components/mdx-viewer";

type Props = {
  slug: string;
  post: SerializedPost;
};

export default function Post({ slug, post }: Props) {
  const {
    frontmatter: { title, date, thumbnail },
  } = post;

  return (
    <article className="prose max-w-full p-4">
      {thumbnail && (
        <Image
          className="w-full mb-6"
          alt={title}
          src={`/posts/${slug}/${thumbnail}`}
          width={760}
          height={420}
        />
      )}
      <section className="flex flex-col">
        <h1 className="mb-2">{title}</h1>
        <time className="text-sm text-gray-500">{date.toString()}</time>
        <hr className="my-6" />
        <MdxViewer source={post} />
        <hr className="my-6" />
      </section>
    </article>
  );
}
