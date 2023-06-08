import { GenreType } from "@/types/genre.type";
import { PostType } from "@/types/post.types";
import { UserType } from "@/types/user.types";
import axios from "axios";

const url = "https://bookmart-miv5.onrender.com";
const url1 = " http://localhost:3001";

export async function getPosts() {
  try {
    const response = await axios.get<{
      data: { post: PostType; userInfo: UserType }[];
    }>(`${url}/posts`);
    if ((response.status !== 200, !response.data)) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getGenres() {
  try {
    const response = await axios.get<GenreType[]>(`${url}/genres`);
    if ((response.status !== 200, !response.data)) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}
export async function getPostsByGenre(id: string) {
  try {
    const response = await axios.get<{ post: PostType; userInfo: UserType }[]>(
      `${url}/posts/genre/${id}`
    );
    if ((response.status !== 200, !response.data)) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}
export async function getPostsByPrice(price: number) {
  try {
    const response = await axios.get<{ post: PostType; userInfo: UserType }[]>(
      `${url}/posts/price/${price}`
    );
    if ((response.status !== 200, !response.data)) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}
export async function getFilteredPosts(filters: {
  price: number;
  genreId: string;
}) {
  try {
    const response = await axios.post<{ post: PostType; userInfo: UserType }[]>(
      `${url1}/posts/filters`,
      { filters }
    );
    if ((response.status !== 200, !response.data)) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}

export async function getUserProfile(createdBy: string) {
  try {
    const response = await axios.get<{
      firstName: string;
      lastName: string;
      profileImageUrl: string;
    }>(`${url1}/users/profile/${createdBy}`);
    if ((response.status !== 200, !response.data)) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}
export async function getAvilablePostsByUserId(createdBy: string) {
  try {
    const response = await axios.get<{
      data: { post: PostType; userInfo: UserType }[];
    }>(`${url1}/posts/available/${createdBy}`);
    if ((response.status !== 200, !response.data)) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}
export async function getSoldPostsByUserId(createdBy: string) {
  try {
    const response = await axios.get<{
      data: { post: PostType; userInfo: UserType }[];
    }>(`${url1}/posts/sold/${createdBy}`);
    if ((response.status !== 200, !response.data)) {
      throw new Error("Failed to fetch data");
    }
    return response.data.data;
  } catch (error: any) {
    return error.message;
  }
}
export async function getPostsBySearch(searchQuery: string) {
  try {
    const response = await axios.get<{ post: PostType; userInfo: UserType }[]>(
      `${url1}/posts/${searchQuery}`
    );
    if ((response.status !== 200, !response.data)) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error: any) {
    return error.message;
  }
}

export async function addToFavorites(
  id: string,
  userId: string,
  token: string
) {
  try {
    console.log("Add to favorites");
    const response = await axios.post(
      `${url1}/posts/addFavorites/${id}`,
      {
        userId: userId,
      },
      { headers: { Authorization: token } }
    );
    if (response.status !== 200) {
      throw new Error("Failed to add to favorites");
    }
    console.log(response.data);
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getFavouritePosts(userId: string, token: string) {
  try {
    const response = await axios.put<{
      data: { post: PostType; userInfo: UserType }[];
    }>(
      `${url1}/posts/favorites`,
      { userId: userId },
      { headers: { Authorization: token } }
    );
    if ((response.status !== 200, !response.data)) {
      throw new Error("Failed to fetch data");
    }

    return response.data.data;
  } catch (error: any) {
    return error.message;
  }
}
