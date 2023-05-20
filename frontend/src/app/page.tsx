import { PostType, getPosts } from '@/utils/utils'
import PostGrid from '@/components/Post/PostGrid';


export default async function Home() {
  const posts: PostType[] = await getPosts()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 "> 
      <h1 className='font-bold text-3xl mt-0 mb-8'>Checkout preloved books posted by sellers</h1>
      <PostGrid posts={posts} /> 
    </main>
  );
}
