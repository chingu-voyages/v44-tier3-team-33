import { PostType } from "@/types/post.types";
import { API } from "@/utils/fetchData";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  params: {
    id: string;
  };
  searchParams: {};
}

export default async function Page({ params }: IProps) {
  const data = await fetch(`${API}/posts/post/${params.id}`);

  const res = await data.json();

  const otherPosts = await fetch(
    `http://localhost:3001/posts/available/${res.data.post?.createdBy}`
  );

  const otherPostsRes = await otherPosts.json().then((res) => res);

  return (
    <div className="flex flex-col items-center gap-6 p-4 pt-0 my-8">
      <div className=" flex flex-col sm:flex-row gap-8 sm:gap-28 mb-8">
        <div className="mx-auto">
          <Image
            src={res.data.post?.imgs?.[0]}
            alt="product"
            width={250}
            height={250}
          />
        </div>
        <div className="flex flex-col gap-2">
          {/* <div>
            <h1 className=" text-2xl font-bold">{res.data.post?.title}</h1>
          </div> */}
          <div className=" mt-2">
            <h3 className=" text-3xl font-bold">{res.data.post?.price}.00$</h3>
          </div>
          <div>
            <h3>
              <span className=" font-bold">Description</span> :{" "}
              {res.data.post?.description}
            </h3>
          </div>
          <div className="inline-block">
            <span className=" font-bold">Genres </span> :
            {res.data.post?.genres?.map((genre: any) => (
              <h3 className="inline-block" key={genre}>
                {genre.genreName}, &nbsp;
              </h3>
            ))}
          </div>
          <div>
            <h3>
              <span className=" font-bold">Condition</span> :{" "}
              {res.data.post?.condition}
            </h3>
          </div>
          <div>
            <h3>
              <span className=" font-bold">Author: </span>
              {res.data.post?.author}
            </h3>
          </div>
          <div>
            <h3>
              <span className=" font-bold">Posted By: </span>
              <Link className="border-b-2 border-gray-400 focus:opacity-50 hover:opacity-50" href={`/seller/${res.data.post?.createdBy}`}>{res.data.userInfo?.firstName ? res.data.userInfo?.firstName : "User" } {res.data.userInfo?.lastName}</Link>
            </h3>
          </div>
          <div className="mt-10">
            <button className="w-full rounded-md border px-12 py-2 hover:bg-red-300">
              <a href={"#"} className=" font-bold">
                Buy
              </a>
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className=" my-3 text-xl font-bold">Other posts by this user</h2>
        <div className=" flex flex-row flex-wrap gap-6 justify-center">
          {otherPostsRes?.slice(0, 3).map((post: any) => (
            <div className="flex flex-col gap-3" key={post._id}>
              <div className=" w-44 rounded-md border-2 p-2">
                <div className=" relative h-56 w-40 rounded-md border border-t-fuchsia-950 p-2">
                  <Image
                    src={post.post?.imgs?.[0]}
                    alt="product"
                    fill
                    sizes="(max-width: 500px) 100px, (max-width: 900px) 200px, (max-width: 1200px) 300px, "
                  />
                </div>

                <h3 className="">{post.post.title}</h3>
                <h3 className="">{post.post.price}.00$</h3>
                <h3 className="">
                  {post.userInfo?.firstName} {post.userInfo?.lastName}{" "}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
