import path from "path";
import { readFile, readdir } from "fs/promises";

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

export interface MetaData extends Partial<Record<string, string>> {
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
}
export type Post = MetaData & { slug: string };
export type SerializedPost = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Post
>;

export async function getAllPosts(): Promise<MetaData[]> {
  const dirPath = path.join(process.cwd(), "posts");
  const filePaths = await readdir(dirPath, "utf-8");
  const metadatas: MetaData[] = await Promise.all(
    filePaths.map(async (filePath) => {
      const content = await readFile(
        path.join(process.cwd(), "posts", filePath),
        "utf-8"
      );
      const mdxSource = await serialize(content, {
        parseFrontmatter: true,
      });
      return {
        ...(mdxSource.frontmatter as MetaData),
        slug: filePath.replace(/\.(mdx|md)$/, ""),
      };
    })
  );

  const sorted = metadatas.sort((a, b) => (a.date > b.date ? -1 : 1));
  return sorted;
}

export async function getPostData(fileName: string): Promise<SerializedPost> {
  const filePath = path.join(process.cwd(), "posts", `${fileName}.mdx`);

  if (!filePath) throw new Error(`The post named ${fileName} cannot be found.`);

  const content = await readFile(filePath, "utf-8");
  const mdxSource: SerializedPost = await serialize(content, {
    parseFrontmatter: true,
  });
  return mdxSource;
}
