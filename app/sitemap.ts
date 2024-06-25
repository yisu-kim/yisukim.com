import { MetadataRoute } from "next";

import { i18n } from "@/i18n";
import { BASE_URL } from "@/lib/constants";
import { getPostsByLocale } from "@/services/post";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = await getMenuRoutes();
  const postRoutes = await getPostRoutes();

  return [...baseRoutes, ...postRoutes];
}

async function getMenuRoutes(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split("T")[0];

  const baseRoute: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: today,
      changeFrequency: "daily",
    },
  ];

  const localizedHomeRoutes: MetadataRoute.Sitemap = i18n.locales.map(
    (locale) => ({
      url: `${BASE_URL}/${locale}`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.7,
    })
  );

  const localizedPostsRoutes: MetadataRoute.Sitemap = i18n.locales.map(
    (locale) => ({
      url: `${BASE_URL}/${locale}/posts`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.7,
    })
  );

  return [...baseRoute, ...localizedHomeRoutes, ...localizedPostsRoutes];
}

async function getPostRoutes() {
  const postsByLocale = await getPostsByLocale();

  const localizedPostRoutes: MetadataRoute.Sitemap = Object.entries(
    postsByLocale
  ).flatMap(([lang, posts]) =>
    posts.map(({ slug, frontmatter: { modifiedAt, createdAt } }) => ({
      url: `${BASE_URL}/${lang}/posts/${slug}`,
      lastModified: modifiedAt ?? createdAt,
      changeFrequency: "daily",
      priority: 0.7,
    }))
  );

  return localizedPostRoutes;
}
