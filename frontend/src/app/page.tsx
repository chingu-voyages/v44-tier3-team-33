import { getPosts, getGenres } from '@/utils/fetchData';
import PostGrid from '@/components/post/PostGrid';
import Filter from '@/components/filters/Filters';

export default async function Home() {
  const userPosts = getPosts();
  const availableGenres = getGenres();

  const [posts, genres] = await Promise.all([userPosts, availableGenres]);

  if (!posts) {
    return <h1>No posts here</h1>;
  }

  return (
  
    <div className=" flex min-h-screen flex-col items-center justify-start  gap-5 px-2 py-3 text-black md:mt-0">
      <div className="flex min-h-screen flex-col items-center justify-start p-4 md:p-8 ">
        <h1 className="mb-8 mt-0 text-3xl font-bold">
          Checkout books posted by sellers
        </h1>
        <Filter genres={genres} />
        <PostGrid posts={posts} />
      </div>
    </div>
  );
}
