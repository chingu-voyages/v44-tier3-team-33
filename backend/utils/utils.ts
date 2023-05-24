import { PostType } from "../types/post.types";
import { users } from "@clerk/clerk-sdk-node";

export const getPostsWithUser: (props: { posts: PostType[] }) => any = async ({
  posts,
}) => {
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
