import { PostType } from "../types/post.types";
import { UserType } from "../types/user.types";
import { users } from "@clerk/clerk-sdk-node";

export const getPostsWithUser: (props: {
  posts: PostType[];
}) => Promise<{ post: PostType; userInfo: UserType }[]> = async ({ posts }) => {
  return Promise.all(
    posts.map(async (post) => {
      const user = await users.getUser(post.createdBy);
      return {
        post: post,
        userInfo: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.emailAddresses[0].emailAddress,
          profileImageUrl: user.profileImageUrl,
          publicMetadata: user.publicMetadata,
        },
      };
    })
  );
};

export const getPostWithUser: (props: {
  post: PostType;
}) => Promise<{ post: PostType; userInfo: UserType }> = async ({ post }) => {
  const user = await users.getUser(post.createdBy);
  return {
    post: post,
    userInfo: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0].emailAddress,
      profileImageUrl: user.profileImageUrl,
      publicMetadata: user.publicMetadata,
    },
  };
};
