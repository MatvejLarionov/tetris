import { getTetris, startGame } from "../../game/game";
import { getRegistration } from "../registration/registration";
import { getSignIn } from "../signIn/getSignIn";
import { getTitle } from "../title/getTitle";

export const getTab=()=>{
    let res=null;
    switch (window.location.pathname) {
        case '/':
            res = getTitle()
            break;
        case '/signIn':
            res = getSignIn()
            break;
        case '/registration':
            res = getRegistration()
            break;
        case '/game':
            res = getTetris()
            startGame()
            break;
        default:
            break;
    }
    return res
}