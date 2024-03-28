import style from "./dialogOfPause.module.css"
import { getButton } from "../components/button"
import { createElement } from "../components/createElement"
import { Tetris } from "./game"
const tolevel=(event)=>{
    Tetris.setDifficultyLevel(event.target.innerText)
    document.getElementById('dialogOfPause').close()
    Tetris.restartGame()
}
const closeDialog=()=>{
    document.getElementById('dialogOfPause').close()
    Tetris.startGame()
}
const restartGame=()=>{
    document.getElementById('dialogOfPause').close()
    Tetris.restartGame()
}
const getHeader=()=>{
    const header=createElement({tagName:'header',className:style.header,id:'header',text:'main menu'})
    return header
}
const getBtnRestart=()=>{
    const btnRestart=getButton({text:'restart',className:style.btnRestart,id:'btnRestart',callBack:restartGame})
    return btnRestart
}
const getDifficultyLevel=()=>{
    const difficultyLevelContainer=createElement({tagName:'div',className:style.difficultyLevelContainer,id:'difficultyLevelContainer'})
    const textOfDifficultyLevel=createElement({tagName:'p',className:style.textOfDifficultyLevel,id:'textOfDifficultyLevel',text:'Difficulty levels:'})
    const btnContainer=createElement({tagName:'div',className:style.btnContainer,id:'btnContainer'})
    btnContainer.append(
        getButton({text:'easy',className:style.btnEasy,id:'btnEasy',callBack:tolevel}),
        getButton({text:'medium',className:style.btnMedium ,id:'btnMedium',callBack:tolevel}),
        getButton({text:'hard',className:style.btnHard,id:'btnHard',callBack:tolevel}),
    )
    difficultyLevelContainer.append(textOfDifficultyLevel,btnContainer)
    return difficultyLevelContainer
}
export const getDialogOfPause=()=>{
    const dialogContainer=createElement({tagName:'div',className:style.dialogContainer,id:'dialogContainer'})
    const btnCloseDialog=getButton({text:'✕',className:style.btnCloseDialog,id:'btnCloseDialog',callBack:closeDialog})
    dialogContainer.append(btnCloseDialog)

    dialogContainer.append(getHeader(),getBtnRestart(),getDifficultyLevel())



    
    
    return dialogContainer
}