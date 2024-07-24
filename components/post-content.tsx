import { Locale } from "@/utils/i18n";
import { dateFormatOptions } from "@/utils/date";
import { getPost } from "@/db/post";
import NotFound from "./not-found";
import { CustomMDX } from "./mdx";

type Props = Readonly<{
  lang: Locale;
  slug: string;
}>;

export default async function PostContent({ lang, slug }: Props) {
  const post = await getPost(lang, slug);
  if (!post) {
    return <NotFound lang={lang} />;
  }

  const {
    content,
    metadata: { title, createdAt },
  } = post;

  return (
    <article className="prose prose-quoteless max-w-full p-6 dark:prose-invert">
      <section className="flex flex-col">
        <h1>{title}</h1>
        <time className="self-end text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString(lang, dateFormatOptions)}
        </time>
        <div className="prose-img:mx-auto">
          <CustomMDX source={content} />
        </div>
      </section>
    </article>
  );
}
