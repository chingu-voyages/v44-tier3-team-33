export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  email: string;
  publicMetadata: { posts: string[] };
};
