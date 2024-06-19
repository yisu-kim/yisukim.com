import * as runtime from "react/jsx-runtime";

import { EvaluateOptions, evaluate } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";

export type Frontmatter = {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
};

export async function getPostMDX(source: string) {
  const { default: MDXContent, frontmatter } = await evaluate(
    source,
    evaluateOptions as EvaluateOptions
  );

  return {
    default: () => <MDXContent components={components} />,
    frontmatter: frontmatter as Frontmatter,
  };
}

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  keepBackground: false,
  defaultLang: "plaintext",
  theme: "catppuccin-latte",
};

const evaluateOptions = {
  ...runtime,
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
};

const components = {
  figure: (props: any) => (
    <figure
      {...props}
      className={
        props.hasOwnProperty("data-rehype-pretty-code-figure")
          ? "not-prose"
          : "prose"
      }
    >
      {props.children}
    </figure>
  ),
};
