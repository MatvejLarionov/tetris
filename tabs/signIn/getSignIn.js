import style from './signIn.module.css'
import { getButton } from "../../components/button.js";
import { createElement } from "../../components/createElement.js";
import { getInput } from "../../components/input.js";
import { getUsers } from '../../api/getUsers.js';
const userData={
    login:'',
    password:'',
    record:0,
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
const getUserData=(event)=>{
    event.preventDefault()
    getUsers().then(res=>{
        const index=res.findIndex(item=>item.login===userData.login && item.password===userData.password) !==-1
        if(index){
            window.location.pathname='/game'
        }
        else{
            document.getElementById('error').innerText='Неправильный логин или пароль'
        }
    })
    // isUser(userData.login).then(res=>{
    //     const error= `${res ? 'Такой пользователь уже существует.' : ''}${userData.isEmpty() ? 'Заполните поля.' : ''}`
    //     if(!error){
    //         postUser(userData).then(res=>{
    //             document.getElementById('signInContainer').reset()
    //             document.getElementById('error').innerText=''
    //             userData.toEmpty()
    //         })
    //     }else{
    //         document.getElementById('error').innerText=error
    //     }
    // })
}
export const getSignIn=()=>{
    const div=createElement({tagName:'div',className:style.container,id:'container'})
    const form=createElement({tagName:'form',className:style.signInContainer,id:'signInContainer'})
    const inpLogin=getInput({labelTitle:"login",type:'text',callBack:getLogin})
    const inpPassword=getInput({labelTitle:"password",type:'password',callBack:getPassword})
    const btn=getButton({text:'отправить',className:style.btnSend,id:'btnSend',callBack:getUserData})
    const p = createElement({tagName:'p',className:style.error,id:'error'})
    form.append(
        inpLogin,
        inpPassword,
        btn)
    div.append(form,p)
    return div
}