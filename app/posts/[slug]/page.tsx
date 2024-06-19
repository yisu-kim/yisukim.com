import PostContent from "@/components/post-content";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  return <PostContent slug={slug} />;
}
