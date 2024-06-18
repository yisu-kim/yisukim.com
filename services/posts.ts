import path from "path";
import { readFile, readdir } from "fs/promises";

import { CompileMDXResult } from "next-mdx-remote/rsc";
import { getCompiledMdx } from "./mdx";

export type Frontmatter = {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
};
export type PostMetaData = Frontmatter & { slug: string };

export async function getAllPostMetaData(): Promise<PostMetaData[]> {
  const dirPath = path.join(process.cwd(), "posts");
  const filePaths = await readdir(dirPath, "utf-8");

  const allPostMetaData: PostMetaData[] = await Promise.all(
    filePaths.map(async (filePath) => {
      const source = await readFile(
        path.join(process.cwd(), "posts", filePath),
        "utf-8"
      );
      const postMetaData = await getCompiledMdx(source);
      return {
        ...(postMetaData.frontmatter as Frontmatter),
        slug: filePath.replace(/\.(mdx|md)$/, ""),
      };
    })
  );
  return allPostMetaData.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export type PostData = CompileMDXResult<PostMetaData>;

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "posts", `${fileName}.mdx`);
  if (!filePath) throw new Error(`The post named ${fileName} cannot be found.`);

  const source = await readFile(filePath, "utf-8");
  const postData = await getCompiledMdx(source);
  return postData;
}
