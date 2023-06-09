"use client";

import { PostType } from "@/types/post.types";
import { UserType } from "@/types/user.types";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BiErrorCircle } from "react-icons/bi";
import { HiDocumentAdd } from "react-icons/hi";

import Post from "./post/Post";

type ProfileProps = {
  profile: {
    firstName: string;
    lastName: string;
    profileImageUrl: string;
  };
  availablePosts: { post: PostType; userInfo: UserType }[];
  soldPosts: { post: PostType; userInfo: UserType }[];
  userId?: string | null;
};

function Profile({ profile, availablePosts, soldPosts, userId }: ProfileProps) {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const { firstName, lastName, profileImageUrl } = profile;
  const { user } = useUser();

  async function updateUser() {
    await user?.update({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    });
    user?.reload();
  }
  const buttonStyle =
    "px-8 py-2  bg-emerald-500 font-bold text-white rounded-lg hover:opacity-50 focus:opacity-50";

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await updateUser();
    } catch (error: any) {
      console.log(error);
      setError("Could not update information");
    }
    setUserInfo({ firstName: "", lastName: "" });
    setIsEditing(false);
    setTimeout(() => {
      setError("");
    }, 1500);
  }

  return (
    <div className="mx-auto max-w-full p-8 text-center md:mt-8">
      <div className="mb-4">
        <Image
          src={profileImageUrl}
          className="mx-auto rounded-full"
          alt="avatar"
          width={250}
          height={250}
        />
      </div>
      {user && userId && (
        <button
          className="inline-flex items-center justify-center gap-4 text-gray-500"
          onClick={() => setIsEditing(true)}
        >
          <span>Edit name</span>
          <BiEditAlt size={20} />
        </button>
      )}
      <div>
        {error && (
          <p className="my-4 flex items-center justify-center gap-4 rounded-lg bg-red-200 p-2 text-red-800">
            <BiErrorCircle size={20} /> {error}
          </p>
        )}
        {user && isEditing ? (
          <>
            <form
              className="my-8 flex flex-col justify-center gap-4 md:flex-row"
              onSubmit={handleSubmit}
            >
              <input
                className="rounded-lg border-2 border-gray-200 p-2"
                type="text"
                value={firstName}
                name="firstName"
                onChange={handleChange}
              />
              <input
                className="rounded-lg border-2 border-gray-200 p-2"
                type="text"
                value={lastName}
                name="lastName"
                onChange={handleChange}
              />
              <div className="flex justify-center gap-4">
                <button
                  className={`${buttonStyle} bg-emerald-500`}
                  type="submit"
                >
                  Save
                </button>
                <button
                  className={`${buttonStyle} bg-red-500`}
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <h1 className="text-center text-3xl font-bold">
            {firstName} {lastName}
          </h1>
        )}
        {userId && (
          <Link
            href="/post"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-8 py-2 md:hidden"
          >
            Add Post <HiDocumentAdd />
          </Link>
        )}
        <h2 className="mt-8  text-xl font-semibold">Available posts</h2>
        <div className="flex flex-nowrap items-center justify-center gap-8 overflow-x-scroll p-8">
          {userId && (
            <div className="mr-8 w-[200px] xs:hidden md:block">
              <Link href="/post">
                <HiDocumentAdd size={280} />
                <p className="text-center">Add post</p>
              </Link>
            </div>
          )}
          {availablePosts?.map((postItem) => (
            <Post key={postItem.post._id} postItem={postItem} />
          ))}
        </div>
      </div>
      {soldPosts.length > 0 && (
        <div>
          <h2 className="mt-8  text-xl font-semibold">Sold posts</h2>
          <div className="flex flex-nowrap justify-center gap-8 overflow-x-scroll p-8">
            {soldPosts.map((postItem) => (
              <Post key={postItem.post._id} postItem={postItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
