import { getPosts, getGenres } from '@/utils/utils'
import PostGrid from '@/components/post/PostGrid';
import Filter from '@/components/filters/Filters';

export default async function Home() {
  
  const userPosts = getPosts()
  const availableGenres = getGenres()

  const [posts, genres] = await Promise.all([userPosts, availableGenres])

  if (!posts) {
    return <h1>No posts here</h1>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 "> 
      <h1 className='font-bold text-3xl mt-0 mb-8'>Check out books posted by sellers</h1>
      <Filter genres={genres} />
      <p className="mb-8">Showing {posts.length} results</p>
      <PostGrid posts={posts} /> 
    </main>
  );
}
