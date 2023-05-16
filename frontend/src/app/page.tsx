import Post from "@/components/post/Post";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";


export default function Home() {
  const { userId } = auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-5 ">
      {userId ? <UserButton /> : <SignInButton />}
      <div><Post /></div>
    </main>
  );
}
