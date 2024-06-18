import Link from "next/link";
import Image from "next/image";

import { PostMetaData } from "@/services/posts";

type Props = {
  post: PostMetaData;
};

export default function PostCard({
  post: { slug, title, description, date, thumbnail },
}: Props) {
  return (
    <Link href={`/posts/${slug}`}>
      <article className="h-full border rounded-lg p-4">
        <div className="h-full flex flex-col gap-4">
          <Image
            className="w-full rounded-lg border"
            src={`/posts/${slug}/${thumbnail}`}
            alt={title}
            width={400}
            height={200}
          />
          <div className="grow flex flex-col">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="w-full grow mt-1 text-gray-500">{description}</p>
            <time className="self-end mt-4 text-sm text-gray-500">
              {date.toString()}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}
