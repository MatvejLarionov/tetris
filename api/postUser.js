import { BASE_URL } from "./BASE_URL"
import { sendRequest } from "./sendRequest"

export const postUser=(user)=>{
    return sendRequest({baseUrl:BASE_URL,body:user,pathname:'users',method:'POST'})
}