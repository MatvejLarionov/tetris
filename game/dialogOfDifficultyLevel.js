import style from "./dialogOfDifficultyLevel.module.css"
import { getButton } from "../components/button"
import { createElement } from "../components/createElement"
import { Tetris } from "./game"
const tolevel=(event)=>{
    Tetris.setDifficultyLevel(event.target.innerText)
    document.getElementById('dialogOfDifficultyLevel').close()
    Tetris.restartGame()
}
const closeDialog=()=>{
    document.getElementById('dialogOfDifficultyLevel').close()
}
export const getDialogOfDifficultyLevel=()=>{
    const dialogContainer=createElement({tagName:'div',className:style.dialogContainer,id:'dialogContainer'})
    const btnArr=[
        getButton({text:'easy',className:style.btnEasy,id:'btnEasy',callBack:tolevel}),
        getButton({text:'medium',className:style.btnMedium ,id:'btnMedium',callBack:tolevel}),
        getButton({text:'hard',className:style.btnHard,id:'btnHard',callBack:tolevel}),    
    ]
    const btnCloseDialog=getButton({text:'✕',className:style.btnCloseDialog,id:'btnCloseDialog',callBack:closeDialog})
    btnArr.forEach(item=>dialogContainer.append(item))
    dialogContainer.append(btnCloseDialog)
    return dialogContainer    
}