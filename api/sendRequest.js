export const sendRequest = async ({baseUrl,method,pathname,id,body})=>{
    const url=`${baseUrl}/${pathname}/${id ? id : '' }`
    const config={
        method:method||'GET'
    }
    if(method==='POST'||method==='PUT'||method==='PATCH'){
        config.body=JSON.stringify(body)
    }
    // switch (method) {
    //     case 'POST' || 'PUT':
    //         config.body=JSON.stringify(body)
    //         break;
    //     case 'DELETE':
    //         config.id = pathName.slice(pathName.indexOf('/'))
    //         break;
    //     case 'POST':
    //         config.body=body
    //         break;
    
    //     default:
    //         break;
    // }
    const data= await fetch(url,config)
    return await data.json()
}