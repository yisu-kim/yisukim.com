import { BASE_URL } from "@/utils/constants";
import { getPostSources } from "@/services/post-source";
import { Post, getPost } from "@/services/post";
import { RootStaticParams } from "@/app/[lang]/layout";
import PostContent from "@/components/post-content";

type PostStaticParams = RootStaticParams & Readonly<{ params: Post }>;

export default async function PostPage({
  params: { lang, slug },
}: PostStaticParams) {
  return <PostContent lang={lang} slug={slug} />;
}

export async function generateStaticParams({
  params: { lang },
}: RootStaticParams) {
  const posts = await getPostSources(lang);
  return posts.map(({ slug }) => ({ lang, slug }));
}

export async function generateMetadata({
  params: { lang, slug },
}: PostStaticParams) {
  const {
    frontmatter: { title, description },
  } = await getPost(lang, slug);
  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    openGraph: {
      images: `/static/posts/${slug}/opengraph.png`,
    },
  };
}
