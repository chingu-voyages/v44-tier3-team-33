import PostGrid from "@/components/post/PostGrid";
import { getPosts } from "@/utils/fetchData";

export default async function Home() {
  const posts = await getPosts();

  if (!posts) {
    return <h1>No posts here</h1>;
  }

  return (
    <main className="mt-[70px] flex min-h-screen flex-col items-center justify-start  gap-5 px-2 py-3 text-black md:mt-0">
      <div className="flex min-h-screen flex-col items-center justify-start p-4 md:p-8 ">
        <h1 className="mb-8 mt-0 text-3xl font-bold">
          Checkout books posted by sellers
        </h1>
        <PostGrid posts={posts} />
      </div>
    </main>
  );
}
