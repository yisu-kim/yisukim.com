import { Locale } from "@/i18n";
import { getPost } from "@/services/post";
import PostContent from "@/components/post-content";

type Props = Readonly<{
  params: {
    lang: Locale;
    slug: string;
  };
}>;

export async function generateMetadata({ params: { lang, slug } }: Props) {
  const {
    frontmatter: { title, description },
  } = await getPost(lang, slug);
  return { title, description };
}

export default async function PostPage({ params: { lang, slug } }: Props) {
  return <PostContent lang={lang} slug={slug} />;
}
