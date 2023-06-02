import axios from "axios"
import { PostType } from '@/types/post.types';
import { UserType } from '@/types/user.types';
import { GenreType } from "@/types/genre.type";


const url= "https://bookmart-miv5.onrender.com"
const url1= " http://localhost:3001"

export async function getPosts(){
  try {
    const response = await axios.get<{data : {post:PostType, userInfo: UserType}[]}>(`${url}/posts`)
    if(response.status !== 200 , !response.data.data){
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    return response.data.data

  } catch(error: any){
    console.log(error)
  }
}

export async function getGenres(){
  try {
    const response = await axios.get<GenreType[]>(`${url}/genres`)
    if (response.status !== 200 , !response.data) {
      throw new Error('Failed to fetch data')
    }
    return response.data

  } catch (error: any){
    return error.message
  }
}
export async function getPostsByGenre(id: string){
  try {
    const response = await axios.get<{post: PostType, userInfo: UserType}[]>(`${url}/posts/genre/${id}`)
    if (response.status !== 200, !response.data) {
      throw new Error('Failed to fetch data')
    }
    return response.data

  } catch (error: any){
    return error.message
  }
}
export async function getPostsByPrice(price: number){
  try {
    const response = await axios.get<{post: PostType, userInfo: UserType}[]>(`${url}/posts/price/${price}`)
    if (response.status !== 200, !response.data) {
      throw new Error('Failed to fetch data')
    }
    return response.data

  } catch (error: any){
    return error.message
  }
}
export async function getFilteredPosts(filters: { price: number, genreId: string}){
  try {
    const response = await axios.post<{post: PostType, userInfo: UserType}[]>(`${url1}/posts/filters`, {filters})
    if (response.status !== 200, !response.data) {
      throw new Error('Failed to fetch data')
    }    
    return response.data

  } catch (error: any){
    return error.message
  }
}
export async function getPostsBySearch(searchQuery: string){
  try {
    const response = await axios.get<{post: PostType, userInfo: UserType}[]>(`${url1}/posts/${searchQuery}`)
    if (response.status !== 200, !response.data) {
      throw new Error('Failed to fetch data')
    }    
    return response.data

  } catch (error: any){
    return error.message
  }
}



