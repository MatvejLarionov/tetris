import style from "./dialogOfLoss.module.css"
import { createElement } from "../components/createElement"
import { getButton } from "../components/button"
import { Tetris } from "./game"

const closeDialog=()=>{
    Tetris.restartGame()
    document.getElementById('dialogOfLoss').close()
}

export const getDialogOfLoss=()=>{
    const dialogContainer=createElement({tagName:'div',className:style.dialogContainer,id:'dialogContainer'})
    const p=createElement({tagName:'p',className:style.text,id:'text',text:'You lose'})
    const btnRestart=getButton({text:'restart',className:style.btnRestart,id:'btnRestart',callBack:closeDialog})
    dialogContainer.append(p,btnRestart)
    return dialogContainer
}