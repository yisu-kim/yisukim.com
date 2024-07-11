import { readFile, readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";

import { Locale } from "@/utils/i18n";

async function getMDXFiles(dirPath: string): Promise<string[]> {
  const filePaths = await readdir(dirPath, "utf-8");
  return filePaths.filter((file) => path.extname(file) === ".mdx");
}

type MDXSource = {
  metadata: Metadata;
  content: string;
};

async function readMDXFile(filePath: string): Promise<MDXSource> {
  const rawContent = await readFile(filePath, "utf-8");
  const { data: metadata, content } = matter(rawContent);
  return { metadata, content } as MDXSource;
}

export type Metadata = {
  title: string;
  description: string;
  createdAt: string;
  modifiedAt?: string;
  thumbnail: string;
};

export type MDXData = {
  slug: string;
  content: string;
  metadata: Metadata;
};

async function getMDXData(dirPath: string): Promise<MDXData[]> {
  const mdxFiles = await getMDXFiles(dirPath);
  const mdxPromises = mdxFiles.map(async (file) => {
    const { metadata, content } = await readMDXFile(path.join(dirPath, file));
    const slug = path.basename(file, path.extname(file));
    return { slug, metadata, content };
  });

  return await Promise.all(mdxPromises);
}

export async function getPosts(locale: Locale): Promise<MDXData[]> {
  const posts = await getMDXData(path.join(process.cwd(), `posts/${locale}`));
  return posts.sort((a, b) =>
    a.metadata.createdAt > b.metadata.createdAt ? -1 : 1,
  );
}

export async function getPost(
  locale: Locale,
  slug: string,
): Promise<MDXData | undefined> {
  const posts = await getMDXData(path.join(process.cwd(), `posts/${locale}`));
  return posts.find((post) => post.slug === slug);
}
