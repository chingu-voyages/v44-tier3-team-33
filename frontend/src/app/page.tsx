import { getPosts, getGenres } from '@/utils/utils'
import PostGrid from '@/components/post/PostGrid';
import SelectGenre from '@/components/SelectGenre';
import FilterPrice from './FilterPrice';

export default async function Home() {
  
  const userPosts = getPosts()
  const availableGenres = getGenres()

  const [posts, genres] = await Promise.all([userPosts, availableGenres])

  if (!posts) {
    return <div>No posts here</div>;
  }

  // async function getFilteredPosts(id: string) {
  //   const filteredPosts = await getPostsByGenre(id)
  //   console.log(filteredPosts)

  // }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 "> 
      <h1 className='font-bold text-3xl mt-0 mb-8'>Check out preloved books posted by sellers</h1>
      <p className="mb-8">Showing {posts.length} results</p>
      <div className='flex flex-col sm:flex-row gap-4 justify-center items-baseline'>
        <label className='text-center'>Filter by Genre</label>
        <SelectGenre genres={genres} />

        <label>Filter by price</label>
        <FilterPrice />
      </div>
      <PostGrid posts={posts} /> 
    </main>
  );
}
