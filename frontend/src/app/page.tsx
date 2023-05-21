import { PostType, getGenres, getPosts } from '@/utils/utils'
import PostGrid from '@/components/Post/PostGrid';

type GenreType = {
  _id: string;
  genreName: string;
}

export default async function Home() {
  const posts: PostType[] = await getPosts()
  const genres = await getGenres()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 "> 
      <h1 className='font-bold text-3xl mt-0 mb-8'>Check out preloved books posted by sellers</h1>
      <p className="mb-8">Showing {posts.length} results</p>
      <div className='flex flex-col sm:flex-row gap-4 justify-center items-baseline'>
        <label className='text-center'>Filter by Genre</label>
        <select className='bg-black text-white p-2 border-black rounded-lg mb-8 cursor-pointer'>
          {genres.map((genre: GenreType) => <option key={genre._id} value={genre.genreName}>{genre.genreName}</option>)}
        </select>
      </div>
      <PostGrid posts={posts} /> 
    </main>
  );
}
