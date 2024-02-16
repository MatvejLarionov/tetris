import { getTitleText } from "../../api/getTitleText";
import { getButton } from "../../components/button";
import { createElement } from "../../components/createElement"
import style from "./title.module.css";
const goToSignIn=()=>{
    window.location.pathname='/signIn'
}
const goToRegistration=()=>{
    window.location.pathname='/registration'
}
export const getTitle=()=>{
    const container=createElement({
        tagName:'div',
        className:style.container,
        id:'titleContainer'
    })
    const nav=createElement({tagName:'nav',
        className:style.nav,
        id:'nav'
    })
    const btnSignIn=getButton({
        text:'sign in',
        className:style.btnSignIn,
        id:'btnSignIn',
        callBack:goToSignIn
    })
    const btnRegistration=getButton({
        text:'registration',
        className:style.btnRegistration,
        id:'btnRegistration',
        callBack:goToRegistration
    })
    const p=createElement({
        tagName:'p',
        className:style.titleText,
        id:'titleText'
    })
    getTitleText().then(res=>{
        p.innerText=res.text
    })
    nav.append(btnSignIn,btnRegistration)
    container.append(p,nav)
    return container
}