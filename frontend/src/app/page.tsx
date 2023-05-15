import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      {userId ? <UserButton /> : <SignInButton />}
    </main>
  );
}
