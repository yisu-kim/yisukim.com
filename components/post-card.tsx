import Link from "next/link";

import { Locale } from "@/utils/i18n";
import { dateFormatOptions } from "@/utils/date";
import { Metadata } from "@/db/post";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = Readonly<{
  lang: Locale;
  slug: string;
  metadata: Metadata;
}>;

export default function PostCard({
  lang,
  slug,
  metadata: { title, description, createdAt },
}: Props) {
  return (
    <Link href={`/${lang}/posts/${slug}`}>
      <article className="h-full">
        <Card className="flex h-full flex-col">
          <CardHeader className="flex grow flex-col">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription className="grow">{description}</CardDescription>
            <CardDescription className="flex">
              <time className="ml-auto">
                {new Date(createdAt).toLocaleDateString(
                  lang,
                  dateFormatOptions,
                )}
              </time>
            </CardDescription>
          </CardHeader>
        </Card>
      </article>
    </Link>
  );
}
