import { getPostData } from "@/service/posts";
import Post from "@/components/post";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  // TODO: Add exception handling
  const post = await getPostData(slug);

  return <Post slug={slug} post={post} />;
}
