export const getButton=({text,className,id,callBack})=>{
    const btn=document.createElement('button')
    if(text){
        btn.innerText=text
    }
    if(className){
        btn.classList.add(className)
    }
    if(id){
        btn.id=id
    }
    if(callBack){
        btn.addEventListener('click',callBack)
    }
    return btn
}