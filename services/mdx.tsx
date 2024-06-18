import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

import { PostMetaData } from "./posts";

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  keepBackground: false,
  defaultLang: "plaintext",
  theme: "catppuccin-latte",
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

export async function getCompiledMdx(source: string) {
  return await compileMDX<PostMetaData>({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
      },
    },
  });
}
