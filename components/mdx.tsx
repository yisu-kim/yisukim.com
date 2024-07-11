import * as runtime from "react/jsx-runtime";
import { ComponentProps } from "react";

import Image from "next/image";

import { evaluate, EvaluateOptions } from "@mdx-js/mdx";
import { MDXComponents } from "mdx/types";
import rehypePrettyCode, {
  Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings, {
  Options as RehypeAutolinkHeadingsOptions,
} from "rehype-autolink-headings";

type Props = {
  source: string;
  components?: MDXComponents;
};

export async function CustomMDX({ source, components, ...rest }: Props) {
  const { default: MDXContent } = await evaluate(
    source,
    evaluateOptions as EvaluateOptions,
  );

  return (
    <MDXContent
      {...rest}
      components={{ ...customComponents, ...(components || {}) }}
    />
  );
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
  remarkPlugins: [],
  rehypePlugins: [
    [rehypePrettyCode, rehypePrettyCodeOptions],
    rehypeSlug,
    [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
  ],
};

const customComponents = {
  figure: (props: ComponentProps<"figure">) => (
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
  img: ({
    src,
    alt,
    width: withoutWidth,
    height: withoutHeight,
    ...rest
  }: ComponentProps<"img">) => {
    if (!src) {
      throw new Error("The image src cannot be found.");
    }

    if (!alt) {
      throw new Error("The image alt cannot be found.");
    }

    return (
      <span style={{ display: "flex", flexDirection: "column" }}>
        <Image
          alt={alt}
          src={src}
          width={0}
          height={0}
          sizes="100vh"
          style={{
            width: "auto",
            height: "100%",
          }}
          {...rest}
        />
      </span>
    );
  },
};
