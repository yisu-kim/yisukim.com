import PostsGrid from "@/components/posts-grid";
import { RootStaticParams } from "./layout";

export default function HomePage({ params: { lang } }: RootStaticParams) {
  return <PostsGrid lang={lang} />;
}
