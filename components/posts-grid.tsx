import { Locale } from "@/utils/i18n";
import { getPosts } from "@/db/post";
import PostCard from "./post-card";

type Props = Readonly<{
  lang: Locale;
}>;

export default async function PostsGrid({ lang }: Props) {
  const posts = await getPosts(lang);

  return (
    <section className="p-4">
      <ul role="list" className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        {posts.map(({ slug, metadata }) => (
          <li key={metadata.title}>
            <PostCard lang={lang} slug={slug} metadata={metadata} />
          </li>
        ))}
      </ul>
    </section>
  );
}
