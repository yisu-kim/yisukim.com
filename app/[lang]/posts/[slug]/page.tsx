import { BASE_URL } from "@/utils/constants";
import { getPost, getPosts, MDXData } from "@/db/post";
import { RootStaticParams } from "@/app/[lang]/layout";
import PostContent from "@/components/post-content";

type PostStaticParams = RootStaticParams & Readonly<{ params: MDXData }>;

// NOTE: This code is currently not working as expected in Vercel deployment.
// There is an open issue regarding this problem: https://github.com/vercel/next.js/issues/54270
export const dynamicParams = false;

export default async function PostPage({
  params: { lang, slug },
}: PostStaticParams) {
  return <PostContent lang={lang} slug={slug} />;
}

export async function generateStaticParams({
  params: { lang },
}: RootStaticParams) {
  const posts = await getPosts(lang);
  return posts.map(({ slug }) => ({ lang, slug }));
}

export async function generateMetadata({
  params: { lang, slug },
}: PostStaticParams) {
  const post = await getPost(lang, slug);
  if (!post) {
    return;
  }

  const {
    metadata: { title, description },
  } = post;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    openGraph: {
      images: `/static/posts/${slug}/opengraph.png`,
    },
  };
}
