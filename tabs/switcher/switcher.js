import { Tetris } from "../../game/game";
import { getRegistration } from "../registration/registration";
import { getSignIn } from "../signIn/getSignIn";
import { getTitle } from "../title/getTitle";

export const getTab=()=>{
    if (window.location.pathname==='/'){
        return getTitle()
    }
    if(window.location.pathname==='/signIn'){
        return getSignIn()
        }
    if (window.location.pathname==='/registration'){
        return getRegistration()
        }
    if (window.location.pathname.includes('/game')){
        const res=Tetris.getTetris()
        Tetris.startGame()
        return res
    }
}