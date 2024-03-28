import './game.scss'
import { GameManadger } from "./GameManadger.js";
import { FigureControllerConstrct } from "./GameManadger.js";
import { Point } from "./Point.js";
import {createElement} from '../components/createElement.js'
import { getButton } from '../components/button.js';
import { getDialogOfLoss } from './dialogOfLoss.js';
import { getDialogOfPause } from './dialogOfPause.js';


// function stopGame(){}
// function restartGame(){}
function openDialogOfPause() {
    Tetris.stopGame()
    document.getElementById('dialogOfPause').showModal()
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
        if(!event){
            this.game.stopGame()
            this.gameField.style.filter='blur(50px)'
            return
        }
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
        // document.getElementById('btnStartStop').innerText='stop'
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
        this.gameField.style.filter='blur(0)'
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
    setBtnPause(){
        const btnPause=getButton({text:'pause',className:'btnPause',id:'btnPause',callBack:openDialogOfPause})
        this.gameContainer.append(btnPause)
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
    setDialogOfPause(){
        const dialog=createElement({tagName:'dialog',className:'dialogOfPause',id:'dialogOfPause'})
        dialog.append(getDialogOfPause())
        this.gameContainer.append(dialog)
    },
    setDialogOfLoss(){
        const dialogOfLoss=createElement({tagName:'dialog',className:'dialogOfLoss',id:'dialogOfLoss'})
        dialogOfLoss.append(getDialogOfLoss())
        this.gameContainer.append(dialogOfLoss)
    },
    getTetris(){
        this.setBtnPause()
        this.createGameField()
        this.setCounts()
        if(!navigator.userAgent.includes('Windows')){
            this.setNavControl()
        }
        
        this.fillField()
        this.roundCorners()

        this.setDialogOfPause()
        this.setDialogOfLoss()
        // for (let i = 330; i < 344; i++) {
        //     this.gameField.querySelectorAll('div')[i].style.background='red'    
        // }
        document.querySelector(':root').style.setProperty('--n',this.n)
        document.querySelector(':root').style.setProperty('--m',this.m)

        
        this.game=new GameManadger(FigureControllerConstrct(this.gameField.getElementsByTagName('div'),this.n,this.m),window.location.pathname.split('/').at(-1),this.timeOfMovdown)
        
        // setTimeout(()=>openDialogOfPause())
        return this.gameContainer
    }
}

// stopGame=Tetris.stopGame.bind(Tetris)

// restartGame=Tetris.restartGame.bind(Tetris)