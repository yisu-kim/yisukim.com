import { cache } from "react";

import { Locale, i18n } from "@/i18n";
import { getPostSources, getPostSource } from "./post-source";
import { PostMDX, getPostMDX } from "./post-mdx";

export type Post = { slug: string } & PostMDX;

export const getPosts = cache(async (lang: Locale) => {
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
});

type PostsByLocale = {
  [key in Locale]: Array<Post>;
};

export async function getPostsByLocale(): Promise<PostsByLocale> {
  const postsByLocale = await Promise.all(
    i18n.locales.map(async (lang) => {
      const posts = await getPosts(lang);
      return [lang, posts];
    })
  );

  return Object.fromEntries(postsByLocale);
}

export const getPost = cache(async (lang: Locale, slug: string) => {
  const { content } = await getPostSource(lang, slug);
  const post = await getPostMDX(content);
  return { slug, ...post };
});
