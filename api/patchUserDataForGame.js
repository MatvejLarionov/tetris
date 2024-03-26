import { BASE_URL } from "./BASE_URL"
import { sendRequest } from "./sendRequest"

export const patchUserDataForGame=(userData)=>{
    return sendRequest({baseUrl:BASE_URL,pathname:'users',body:userData,method:'PATCH',id:userData.id})
}