import { PostType, getPosts } from '@/utils/utils'
import Post from '@/components/Post/Post'

export default async function Home() {
  const posts = await getPosts()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">  
      {posts.map((post: PostType) => <Post key={post._id} />)}
    </main>
  );
}
