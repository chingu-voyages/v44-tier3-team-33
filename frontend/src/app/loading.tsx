import { LoadingPostGrid } from "@/components/post/LoadingPost";

const Loading = () => {
  return (
     <div className="mt-[70px] flex min-h-screen flex-col items-center justify-start  gap-5 px-2 py-3 text-black md:mt-0">
      <div className="flex min-h-screen flex-col items-center justify-start p-4 md:p-8 ">
        <h1 className="mb-8 mt-0 text-3xl font-bold">
          Checkout books posted by sellers
        </h1>
        <LoadingPostGrid posts={Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }))} />
      </div>
    </div>
  );
};

export default Loading;
