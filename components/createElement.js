export const createElement=({tagName,className,id,text})=>{
    const el=document.createElement(tagName)
    // el.className=className
    el.classList.add(className)
    if(id){
        el.id=id
    }
    if(text){
        el.innerText=text
    }
    return el
}