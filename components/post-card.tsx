import Link from "next/link";
import Image from "next/image";

import { Post } from "@/service/posts";

type Props = { post: Post };
export default function PostCard({
  post: { title, description, date, path },
}: Props) {
  return (
    <Link href={`/posts/${path}`}>
      <article className="h-full border p-2">
        <div className="h-full flex flex-col border">
          <Image
            className="w-full"
            src={`/images/posts/${path}.png`}
            alt={title}
            width={400}
            height={300}
          />
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
