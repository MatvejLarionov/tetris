import  style  from "./registration.module.css";
import { getButton } from "../../components/button.js";
import { createElement } from "../../components/createElement.js";
import { getInput } from "../../components/input.js";
import { postUser } from '../../api/postUser.js';
import { isUser } from "../../api/isUser.js";
const userData={
    login:'',
    password:'',
    dataForGame:{
        record:0,
        settings:{
            difficultyLevel:'medium',
        }
    },
    setLogin(login){
        this.login=login
    },
    setPassword(password){
        this.password=password
    },
    toEmpty(){
        this.login=''
        this.password=''
    },
    isEmpty(){
        return !(this.login && this.password)
    }
}
const getLogin=(login)=>{
    userData.setLogin(login)
}
const getPassword=(password)=>{
    userData.setPassword(password)
}
const postUserData=(event)=>{
    event.preventDefault()
    isUser(userData.login).then(res=>{
        const error= `${res ? 'Такой пользователь уже существует.' : ''}${userData.isEmpty() ? 'Заполните поля.' : ''}`
        if(!error){
            postUser(userData).then(res=>{
                document.getElementById('regContainer').reset()
                document.getElementById('error').innerText=''
                window.location.pathname=`/game/${res.id}`
                userData.toEmpty()
            })
        }else{
            document.getElementById('error').innerText=error
        }
    })
}
export const getRegistration=()=>{
    const div=createElement({tagName:'div',className:style.container,id:'container'})
    const form=createElement({tagName:'form',className:style.regContainer,id:'regContainer'})
    const inpLogin=getInput({labelTitle:"login",type:'text',callBack:getLogin})
    const inpPassword=getInput({labelTitle:"password",type:'password',callBack:getPassword})
    const btn=getButton({text:'отправить',className:style.btnSend,id:'btnSend',callBack:postUserData})
    const p = createElement({tagName:'p',className:style.error,id:'error'})
    form.append(
        inpLogin,
        inpPassword,
        btn)
    div.append(form,p)
    return div
}