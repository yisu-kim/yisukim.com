import { MetadataRoute } from "next";

import { Locale, i18n } from "@/i18n";
import { BASE_URL } from "@/lib/constants";
import { Post, getPosts } from "@/services/post";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = await getBaseRoutes();
  const postRoutes = await getPostRoutes();

  return [...baseRoutes, ...postRoutes];
}

async function getBaseRoutes(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split("T")[0];

  const baseRoute: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: today,
      changeFrequency: "daily",
    },
  ];

  const localizedRoutes: MetadataRoute.Sitemap = i18n.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: today,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...baseRoute, ...localizedRoutes];
}

type PostsByLocale = {
  [key in Locale]: Array<Post>;
};

async function getPostsByLocale(): Promise<PostsByLocale> {
  const postsByLocale = await Promise.all(
    i18n.locales.map(async (lang) => {
      const posts = await getPosts(lang);
      return [lang, posts];
    })
  );

  return Object.fromEntries(postsByLocale);
}

async function getPostRoutes() {
  const postsByLocale = await getPostsByLocale();

  const localizedRoutes: MetadataRoute.Sitemap = Object.entries(
    postsByLocale
  ).flatMap(([lang, posts]) =>
    posts.map(({ slug, frontmatter: { modifiedAt, createdAt } }) => ({
      url: `${BASE_URL}/${lang}/posts/${slug}`,
      lastModified: modifiedAt ?? createdAt,
      changeFrequency: "daily",
      priority: 0.7,
    }))
  );

  return localizedRoutes;
}
