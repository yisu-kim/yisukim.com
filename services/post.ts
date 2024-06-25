import { Locale } from "@/i18n";
import { getPostSources, getPostSource } from "./post-source";
import { PostMDX, getPostMDX } from "./post-mdx";

export type Post = { slug: string } & PostMDX;

export async function getPosts(lang: Locale) {
  const sources = await getPostSources(lang);
  const posts = await Promise.all(
    sources.map(async ({ slug, content }) => {
      const post = await getPostMDX(content);
      return { slug, ...post };
    })
  );
  return posts.sort((a, b) =>
    a.frontmatter.createdAt > b.frontmatter.createdAt ? -1 : 1
  );
}

export async function getPost(lang: Locale, slug: string) {
  const { content } = await getPostSource(lang, slug);
  const post = await getPostMDX(content);
  return { slug, ...post };
}
