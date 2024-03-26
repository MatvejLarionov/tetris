import './game.scss'
import { GameManadger } from "./GameManadger.js";
import { FigureControllerConstrct } from "./GameManadger.js";
import { Point } from "./Point.js";
import {createElement} from '../components/createElement.js'
import { getButton } from '../components/button.js';
import { getDialogOfDifficultyLevel } from './dialogOfDifficultyLevel.js';
import { getDialogOfLoss } from './dialogOfLoss.js';


function stopGame(){}
function restartGame(){}
function openDialogOfDifficultyLevel() {
    document.getElementById('dialogOfDifficultyLevel').showModal()
}
export function openDialogOfLoss(){
    document.getElementById('dialogOfLoss').showModal()
}
const difficultyLevels={
    easy:500,
    medium:250,
    hard:150,
}
export const Tetris={
    gameContainer:createElement({tagName:'div',className:'gameContainer',id:'gameContainer'}),
    game:null,
    gameField:null,
    timeOfMovdown:300,
    n:15,
    m:23,

    setDifficultyLevel(difficultyLevel){
        this.timeOfMovdown=difficultyLevels[difficultyLevel]
    },
    stopGame(event){
        if(event.target.innerText.toLowerCase()==='stop'){
            this.game.stopGame()
            event.target.innerText='start'
            this.gameField.style.filter='blur(50px)'
        }else if(event.target.innerText.toLowerCase()==='start'){
            this.game.startGame()
            event.target.innerText='stop'
            this.gameField.style.filter='blur(0)'
        }
    },
    id:null,
    restartGame(){
        document.getElementById('btnStartStop').innerText='stop'
        this.gameField.style.filter='blur(0)'
        this.game.timeOfMovdown=this.timeOfMovdown
        this.game.restartGame()
        // this.game.deleteGame()
        // if(this.id){
        //     clearTimeout(this.id)
        //     this.id=null
        // }
        // if(!this.id){
        //     this.id = setTimeout(()=>{
        //         this.game.startGame()
        //     },200)
        // }
    },
    startGame(){
        this.game.startGame()
    },

    createGameField(){
        this.gameField=createElement({tagName:'div',className:'gameField',id:'gameField'})

        this.gameContainer.append(this.gameField)
    },
    setCounts(){
        const count=createElement({tagName:'p',className:'count',id:'count',text:'0'})
        const record=createElement({tagName:'p',className:'record',id:'record',text:'0'})
        const countContainer=createElement({tagName:'div',className:'countContainer',id:'countContainer'})
        countContainer.append(count,record)
        
        this.gameContainer.append(countContainer)
    },
    setNav(){
        const nav=createElement({tagName:'nav',className:'nav',id:'nav'})
        const btnStartStop=getButton({text:'stop',className:'btnStartStop',id:'btnStartStop',callBack:stopGame})
        const btnRestart=getButton({text:'restart',className:'btnRestart',id:'btnRestart',callBack:restartGame})
        const btnDifficultyLevel=getButton({text:'difficulty level',className:'btnDifficultyLevel',id:'btnDifficultyLevel',callBack:openDialogOfDifficultyLevel})
        nav.append(
            btnStartStop,
            btnRestart,
            btnDifficultyLevel,
        )
        
        
        this.gameContainer.append(nav)
    },
    setNavControl(){
        const navControl=createElement({tagName:'nav',className:'navControl',id:'navControl'});
        const btnRight=getButton({className:'btnRight',id:'btnRight'})
        const btnLeft=getButton({className:'btnLeft',id:'btnLeft'})
    
        const btnTurnClockwise=getButton({className:'btnTurnClockwise',id:'btnTurnClockwise'})
        const btnTurnCounterclockwise=getButton({className:'btnTurnCounterclockwise',id:'btnTurnCounterclockwise'})
        navControl.append(
            btnLeft,
            btnTurnCounterclockwise,
            btnTurnClockwise,
            btnRight,
        )
        
        
        this.gameContainer.append(navControl)
    },
    fillField(){
        const crtCell=(color)=>{
            const div=document.createElement('div')
            div.style.background=color
            div.className='cell'
            this.gameField.append(div)
        }
        for (let i = 0; i < this.n*this.m; i++) {
            crtCell('white')
        }
    },
    roundCorners(){
        this.gameField.getElementsByTagName('div')[0].style.borderTopLeftRadius='15px'
        this.gameField.getElementsByTagName('div')[new Point(this.n - 1,0).getIndex(this.n)].style.borderTopRightRadius='15px'
        this.gameField.getElementsByTagName('div')[new Point(this.n - 1,this.m - 1).getIndex(this.n)].style.borderBottomRightRadius='15px'
        this.gameField.getElementsByTagName('div')[new Point(0,this.m-1).getIndex(this.n)].style.borderBottomLeftRadius='15px'
    },
    setDialogOfDifficultyLevel(){
        const dialog=createElement({tagName:'dialog',className:'dialogOfDifficultyLevel',id:'dialogOfDifficultyLevel'})
        dialog.append(getDialogOfDifficultyLevel())
        this.gameContainer.append(dialog)
    },
    setDialogOfLoss(){
        const dialogOfLoss=createElement({tagName:'dialog',className:'dialogOfLoss',id:'dialogOfLoss'})
        dialogOfLoss.append(getDialogOfLoss())
        this.gameContainer.append(dialogOfLoss)
    },
    getTetris(){
        this.setNav()
        this.createGameField()
        this.setCounts()
        if(!navigator.userAgent.includes('Windows')){
            this.setNavControl()
        }
        
        this.fillField()
        this.roundCorners()

        this.setDialogOfDifficultyLevel()
        this.setDialogOfLoss()
        for (let i = 330; i < 344; i++) {
            this.gameField.querySelectorAll('div')[i].style.background='red'    
        }
        document.querySelector(':root').style.setProperty('--n',this.n)
        document.querySelector(':root').style.setProperty('--m',this.m)

        
        this.game=new GameManadger(FigureControllerConstrct(this.gameField.getElementsByTagName('div'),this.n,this.m),window.location.pathname.split('/').at(-1),this.timeOfMovdown)
        
        return this.gameContainer
    }
}

stopGame=Tetris.stopGame.bind(Tetris)

restartGame=Tetris.restartGame.bind(Tetris)