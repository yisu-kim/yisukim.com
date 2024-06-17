import Link from "next/link";
import Image from "next/image";

import { MetaData } from "@/service/posts";

type Props = { post: MetaData };
export default function PostCard({
  post: { slug, title, description, date, thumbnail },
}: Props) {
  return (
    <Link href={`/posts/${slug}`}>
      <article className="h-full border p-2">
        <div className="h-full flex flex-col border">
          {thumbnail && (
            <Image
              className="w-full"
              src={`/posts/${slug}/${thumbnail}`}
              alt={title}
              width={400}
              height={300}
            />
          )}
          <div className="grow flex flex-col gap-1 p-4">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="w-full grow">{description}</p>
            <time className="self-end text-sm text-gray-500">
              {date.toString()}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}
