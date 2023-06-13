import Profile from "@/components/Profile";
import {
  getAvilablePostsByUserId,
  getSoldPostsByUserId,
  getUserProfile,
} from "@/utils/utils";
import React from "react";

type ParamsProps = {
  params: {
    id: string;
  };
};
async function SellerProfile({ params }: ParamsProps) {
  const profilePromise = getUserProfile(params.id);
  const availablePostsPromise = getAvilablePostsByUserId(params.id);
  const soldPostsPromise = getSoldPostsByUserId(params.id);

  const [profile, availablePosts, soldPosts] = await Promise.all([
    profilePromise,
    availablePostsPromise,
    soldPostsPromise,
  ]);

  return (
    <Profile
      profile={profile}
      availablePosts={availablePosts}
      soldPosts={soldPosts}
    />
  );
}

export default SellerProfile;
