import { getAllPosts } from "@/service/posts";
import PostCard from "./post-card";

export default async function PostsGrid() {
  const posts = await getAllPosts();

  return (
    <section className="p-4">
      <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {posts.map((post) => (
          <li key={post.thumbnail}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
