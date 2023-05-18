import axios from "axios"

export type PostType = {
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
}

const url = "http://localhost:3000"

export async function getPosts(){
  try {
    const response = await fetch(`${url}/posts`)
    const data = await response.json()
    return data

  } catch(error: any){
    return error.message
  }
}