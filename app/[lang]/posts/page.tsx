import { RootStaticParams } from "@/app/[lang]/layout";
import PostsGrid from "@/components/posts-grid";

export default function PostsPage({ params: { lang } }: RootStaticParams) {
  return <PostsGrid lang={lang} />;
}
