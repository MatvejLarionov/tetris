import { getUsers } from "./getUsers"

export const isUser=async (login)=>{
    return await getUsers().then(res=>
        res.findIndex(item=>login === item.login) !== -1
    )
}