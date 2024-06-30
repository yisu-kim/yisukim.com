import { Locale } from "@/utils/i18n";
import { getPosts } from "@/services/post";
import PostCard from "./post-card";

type Props = Readonly<{
  lang: Locale;
}>;

export default async function PostsGrid({ lang }: Props) {
  const posts = await getPosts(lang);

  return (
    <section className="p-4">
      <ul role="list" className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        {posts.map(({ slug, frontmatter }) => (
          <li key={frontmatter.title}>
            <PostCard lang={lang} slug={slug} frontmatter={frontmatter} />
          </li>
        ))}
      </ul>
    </section>
  );
}
