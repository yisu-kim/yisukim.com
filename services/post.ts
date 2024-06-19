import { getAllPostSource, getPostSource } from "./post-source";
import { getPostMDX } from "./post-mdx";

export async function getAllPost() {
  const sources = await getAllPostSource();
  const allPost = await Promise.all(
    sources.map(async ({ slug, content }) => {
      const post = await getPostMDX(content);
      return { slug, ...post };
    })
  );
  return allPost.sort((a, b) =>
    a.frontmatter.date > b.frontmatter.date ? -1 : 1
  );
}

export async function getPost(slug: string) {
  const { content } = await getPostSource(slug);
  const post = await getPostMDX(content);
  return { slug, ...post };
}
