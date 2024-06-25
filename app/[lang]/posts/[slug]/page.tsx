import { Locale } from "@/i18n";
import { getPost } from "@/services/post";
import PostContent from "@/components/post-content";
import { BASE_URL } from "@/lib/constants";

type Props = Readonly<{
  params: {
    lang: Locale;
    slug: string;
  };
}>;

export async function generateMetadata({ params: { lang, slug } }: Props) {
  const {
    frontmatter: { title, description, thumbnail },
  } = await getPost(lang, slug);
  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    openGraph: {
      images: `/static/posts/${slug}/${thumbnail}`,
    },
  };
}

export default async function PostPage({ params: { lang, slug } }: Props) {
  return <PostContent lang={lang} slug={slug} />;
}
