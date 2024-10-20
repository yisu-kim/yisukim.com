import { BASE_URL } from "@/utils/constants";
import { getDictionary } from "@/utils/dictionaries";
import { RootStaticParams } from "@/app/[lang]/layout";
import PostsGrid from "@/components/posts-grid";

export default function PostsPage({ params: { lang } }: RootStaticParams) {
  return <PostsGrid lang={lang} />;
}

export async function generateMetadata({ params: { lang } }: RootStaticParams) {
  const {
    page: { posts },
  } = await getDictionary(lang);
  return {
    metadataBase: new URL(BASE_URL),
    title: posts,
  };
}
