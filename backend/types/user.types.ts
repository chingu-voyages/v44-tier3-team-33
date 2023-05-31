export type UserType = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string;
  email: string;
  publicMetadata: UserPublicMetadata;
};
