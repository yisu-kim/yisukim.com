"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = {
  source: MDXRemoteSerializeResult;
};

export default function MdxViewer({ source }: Props) {
  return <MDXRemote {...source} />;
}
