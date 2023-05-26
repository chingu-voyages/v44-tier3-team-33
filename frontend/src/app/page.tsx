import { getPosts, getGenres } from '@/utils/utils'
import PostGrid from '@/components/post/PostGrid';
import Filter from '@/components/filters/Filters';

export default async function Home() {
  
  const userPosts = getPosts()
  const availableGenres = getGenres()

  const [posts, genres] = await Promise.all([userPosts, availableGenres])

  if (!posts) {
    return <div>No posts here</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 "> 
      <h1 className='font-bold text-3xl mt-0 mb-8'>Check out preloved books posted by sellers</h1>
      {/* <div className='flex flex-col md:flex-row gap-4 justify-center items-baseline'> */}
        {/* <h3>Filter posts</h3> */}
        <Filter genres={genres} />
      <p className="mb-8">Showing {posts.length} results</p>
      {/* </div> */}
      <PostGrid posts={posts} /> 
    </main>
  );
}
