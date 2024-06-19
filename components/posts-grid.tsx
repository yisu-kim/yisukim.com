import { getAllPost } from "@/services/post";
import PostCard from "./post-card";

export default async function PostsGrid() {
  const posts = await getAllPost();

  return (
    <section className="p-4">
      <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {posts.map(({ slug, frontmatter }) => (
          <li key={frontmatter.title}>
            <PostCard slug={slug} frontmatter={frontmatter} />
          </li>
        ))}
      </ul>
    </section>
  );
}
