import { Locale } from "@/i18n";
import { getAllPostSource, getPostSource } from "./post-source";
import { getPostMDX } from "./post-mdx";

export async function getAllPost(lang: Locale) {
  const sources = await getAllPostSource(lang);
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

export async function getPost(lang: Locale, slug: string) {
  const { content } = await getPostSource(lang, slug);
  const post = await getPostMDX(content);
  return { slug, ...post };
}
