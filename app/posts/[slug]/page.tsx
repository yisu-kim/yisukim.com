import { getPostData } from "@/services/posts";
import PostContent from "@/components/post-content";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  // TODO: Add exception handling
  const post = await getPostData(slug);

  return <PostContent slug={slug} post={post} />;
}
