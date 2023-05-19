import { PostType, getPosts } from '@/utils/utils'
import PostGrid from '@/components/Post/PostGrid';

export default async function Home() {
  const posts: PostType[] = await getPosts()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 "> 
      <PostGrid posts={posts} /> 
    </main>
  );
}
