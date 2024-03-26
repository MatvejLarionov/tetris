import { BASE_URL } from "./BASE_URL"
import { sendRequest } from "./sendRequest"

export const getUserDataForGame=(userId)=>{
    return sendRequest({baseUrl:BASE_URL,id:userId,pathname:'users'}).then(res=>res.dataForGame)
}