import { Locale } from "@/i18n";
import { getAllPost } from "@/services/post";
import PostCard from "./post-card";

type Props = {
  lang: Locale;
};

export default async function PostsGrid({ lang }: Props) {
  const posts = await getAllPost(lang);

  return (
    <section className="p-4">
      <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {posts.map(({ slug, frontmatter }) => (
          <li key={frontmatter.title}>
            <PostCard lang={lang} slug={slug} frontmatter={frontmatter} />
          </li>
        ))}
      </ul>
    </section>
  );
}
