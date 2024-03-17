import { BASE_URL } from "./BASE_URL"
import { sendRequest } from "./sendRequest"

export const getText=(id)=>{
    return sendRequest({baseUrl:BASE_URL,pathname:'texts',id})
}