import axios from "axios"

export type PostType = {
  post: {
    _id: string,
    createdBy: string,
    image: string,
    author: string,
    title: string,
    genres: string,
    isbn: string,
    condition: string,
    price: number,
    status: string,
    createdDate: Date,
  },
  userInfo:{
    firstName: string;
    lastName: string
  }
}

const url= "https://v44-tier3-team-33-u43g-heypbzh2c-eslemouederni.vercel.app"


export async function getPosts(){
  try {
    const response = await fetch(`${url}/posts/`)
    const data = await response.json()
    return data

  } catch(error: any){
    return error.message
  }
}

export async function getGenres(){
  try {
    const response = await fetch(`${url}/genres`)
    const data = await response.json()
    return data

  } catch (error: any){
    return error.message
  }
}
export async function getPostsByGenre(id: string){
  try {
    const response = await fetch(`${url}/posts/genre/${id}`)
    const data = await response.json()
    return data

  } catch (error: any){
    return error.message
  }
}

