import { Locale } from "@/i18n";
import PostsGrid from "@/components/posts-grid";

type Props = Readonly<{
  params: { lang: Locale };
}>;

export default function HomePage({ params: { lang } }: Props) {
  return <PostsGrid lang={lang} />;
}
