import path from "path";
import { access, readFile, readdir } from "fs/promises";

import { cache } from "react";

import { Locale } from "@/utils/i18n";

export type PostSource = {
  slug: string;
  content: string;
};

export const getPostSources = cache(
  async (lang: Locale): Promise<PostSource[]> => {
    const dirPath = path.join(process.cwd(), `posts/${lang}`);
    const filePaths = await readdir(dirPath, "utf-8");

    const sources = await Promise.all(
      filePaths.map(async (filePath) => {
        const content = await readFile(
          path.join(process.cwd(), `posts/${lang}`, filePath),
          "utf-8"
        );
        const fileName = getMDXFileName(filePath);
        return { slug: fileName, content };
      })
    );
    return sources;
  }
);

export const getPostSource = cache(
  async (lang: Locale, slug: string): Promise<PostSource> => {
    const filePath = path.join(process.cwd(), `posts/${lang}`, `${slug}.mdx`);
    try {
      await access(filePath);
    } catch (e) {
      throw new Error(`The post named ${slug} cannot be found.`);
    }

    const content = await readFile(filePath, "utf-8");
    const fileName = getMDXFileName(filePath);
    const source = { slug: fileName, content };
    return source;
  }
);

function getMDXFileName(filePath: string) {
  return filePath.replace(/\.(mdx|md)/, "");
}
