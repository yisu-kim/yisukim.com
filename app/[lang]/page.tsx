import { RootStaticParams } from "@/app/[lang]/layout";
import PostsGrid from "@/components/posts-grid";

export default function HomePage({ params: { lang } }: RootStaticParams) {
  return <PostsGrid lang={lang} />;
}
