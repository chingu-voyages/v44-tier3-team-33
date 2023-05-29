import { PostType } from "@/types/post.types";
import Image from "next/image";

interface IProps {
  params: {
    id: string;
  };
  searchParams: {};
}

export default async function Page({ params }: IProps) {
  const data = await fetch(
    `https://bookmart-miv5.onrender.com/posts/post/${params.id}`
  );

  const res = await data.json();
  const otherPosts = await fetch(
    `http://localhost:3000/posts/${res.data.post?.createdBy}`
  );
  const otherPostsRes = await otherPosts.json().then((res) => res.data);
  console.log(otherPostsRes);

  return (
    <div className="flex flex-col gap-6">
      <div className=" flex flex-row gap-28">
        <div className="">
          <Image
            src={res.data.post?.imgs?.[0]}
            alt="product"
            width={250}
            height={250}
          />
        </div>
        <div className=" flex flex-col">
          <div>
            <h1 className=" text-2xl font-bold">{res.data.post?.title}</h1>
          </div>
          <div>
            <h1 className=" text-xl font-bold">{res.data.post?.price}.00$</h1>
          </div>
          <div>
            <h1>{res.data.post?.description}</h1>
          </div>
          <div>
            <h1>{res.data.post?.genre}</h1>
          </div>
          <div>
            <h1>{res.data.post?.condition}</h1>
          </div>
          <div className=" mt-10">
            <button className=" rounded-sm border px-10 py-2 ">
              <a href={"#"} className=" font-bold">
                Buy
              </a>
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1 className=" text-xl font-bold">Other posts by this user</h1>
        <div className=" flex flex-row flex-wrap gap-6">
          {otherPostsRes?.slice(0, 2).map((post: any) => (
            <div className="flex flex-col" key={post._id}>
              <div>
                <Image
                  src={post.post?.imgs?.[0]}
                  alt="product"
                  width={100}
                  height={100}
                />

                <h2 className="">{post.post.title}</h2>
                <h2 className="">{post.post.price}.00$</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
