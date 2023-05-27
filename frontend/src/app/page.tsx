import PostGrid from "@/components/post/PostGrid";
import { getPosts } from "@/utils/fetchData";

export default async function Home() {
  const posts = await getPosts();

  if (!posts) {
    return <h1>No posts here</h1>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-4 md:p-8 ">
      <h1 className="mb-8 mt-0 text-3xl font-bold">
        Checkout books posted by sellers
      </h1>
      <PostGrid posts={posts} />
    </div>
  );
}
