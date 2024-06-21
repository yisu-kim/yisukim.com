import { Locale } from "@/i18n";
import PostContent from "@/components/post-content";

type Props = Readonly<{
  params: {
    lang: Locale;
    slug: string;
  };
}>;

export default async function PostPage({ params: { lang, slug } }: Props) {
  return <PostContent lang={lang} slug={slug} />;
}
