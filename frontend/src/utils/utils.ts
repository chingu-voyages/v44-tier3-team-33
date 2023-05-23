import axios from "axios"
import { PostType } from '@/types/post.types';
import { UserType } from '@/types/user.types';
import { GenreType } from "@/types/genre.type";


const url= " https://bookmart-miv5.onrender.com"

export async function getPosts(){
  try {
    const response = await axios.get<{post:PostType, userInfo: UserType}[]>(`${url}/posts`)
    if(response.status !== 200 , !response.data){
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    return response.data

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

