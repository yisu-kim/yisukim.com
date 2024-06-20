import { Locale } from "@/i18n-config";
import PostsGrid from "@/components/posts-grid";

type Props = {
  params: { lang: Locale };
};

export default function HomePage({ params: { lang } }: Props) {
  return <PostsGrid lang={lang} />;
}
