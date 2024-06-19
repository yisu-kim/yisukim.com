import path from "path";
import { readFile, readdir } from "fs/promises";

export type PostSource = {
  slug: string;
  content: string;
};

export async function getAllPostSource(): Promise<PostSource[]> {
  const dirPath = path.join(process.cwd(), "posts");
  const filePaths = await readdir(dirPath, "utf-8");

  const allSource = await Promise.all(
    filePaths.map(async (filePath) => {
      const content = await readFile(
        path.join(process.cwd(), "posts", filePath),
        "utf-8"
      );
      const fileName = getMDXFileName(filePath);
      return { slug: fileName, content };
    })
  );
  return allSource;
}

export async function getPostSource(slug: string): Promise<PostSource> {
  const filePath = path.join(process.cwd(), "posts", `${slug}.mdx`);
  if (!filePath) throw new Error(`The post named ${slug} cannot be found.`);

  const content = await readFile(filePath, "utf-8");
  const fileName = getMDXFileName(filePath);
  const source = { slug: fileName, content };
  return source;
}

function getMDXFileName(filePath: string) {
  return filePath.replace(/\.(mdx|md)/, "");
}
