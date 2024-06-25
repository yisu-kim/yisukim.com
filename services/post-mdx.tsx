import { PropsWithChildren } from "react";
import * as runtime from "react/jsx-runtime";

import { EvaluateOptions, evaluate } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrettyCode, {
  Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings, {
  Options as RehypeAutolinkHeadingsOptions,
} from "rehype-autolink-headings";

export type Frontmatter = {
  title: string;
  description: string;
  createdAt: string;
  modifiedAt?: string;
  thumbnail: string;
};

export type PostMDX = {
  default: () => JSX.Element;
  frontmatter: Frontmatter;
};

export async function getPostMDX(source: string): Promise<PostMDX> {
  const { default: MDXContent, frontmatter } = await evaluate(
    source,
    evaluateOptions as EvaluateOptions
  );

  return {
    default: () => <MDXContent components={components} />,
    frontmatter: frontmatter as Frontmatter,
  };
}

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  keepBackground: false,
  defaultLang: "plaintext",
  theme: "catppuccin-latte",
};

const rehypeAutolinkHeadingsOptions: RehypeAutolinkHeadingsOptions = {
  behavior: "wrap",
  properties: {
    className: ["heading-anchor"],
  },
};

const evaluateOptions = {
  ...runtime,
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  rehypePlugins: [
    [rehypePrettyCode, rehypePrettyCodeOptions],
    rehypeSlug,
    [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
  ],
};

const components = {
  figure: (props: PropsWithChildren) => (
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
