import PostGrid from "@/components/post/PostGrid";
import { getPosts } from "@/utils/utils";

export default async function Home() {
  const posts = await getPosts();

  if (!posts) {
    return <div>No posts here</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 ">
      <h1 className="mb-8 mt-0 text-3xl font-bold">
        Checkout preloaded books posted by sellers
      </h1>
      <PostGrid posts={posts} />
    </main>
  );
}
