import { BASE_URL } from "./BASE_URL"
import { sendRequest } from "./sendRequest"

export const getUsers=()=>{
    return sendRequest({baseUrl:BASE_URL,pathname:'users'})
}