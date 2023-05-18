import Post from "@/components/post/Post";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";


export default function Home() {
  const { userId } = auth();
  return (
    <div>
      {userId ? <UserButton /> : <SignInButton />}
    </div>
  );
}
