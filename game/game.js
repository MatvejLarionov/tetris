import './game.scss'
import { GameManadger } from "./GameManadger.js";
import { FigureControllerConstrct } from "./GameManadger.js";
import { Point } from "./Point.js";
import {createElement} from '../components/createElement.js'
import { getButton } from '../components/button.js';

let g=null;

export const stopGame=()=>{
    g.stopGame()
}
let id=null
const restartGame=()=>{
    g.deleteGame()
        if(id){
            clearTimeout(id)
            id=null
        }
        if(!id){
            id = setTimeout(()=>{
                g.startGame()
            },200)
        }
}
export const startGame=()=>{
    g.startGame()
}
export const getTetris=()=>{
    const gameContainer=createElement({tagName:'div',className:'gameContainer',id:'gameContainer'})

    const game=createElement({tagName:'div',className:'game',id:'game'})
    const count=createElement({tagName:'p',className:'count',id:'count'})
    const record=createElement({tagName:'p',className:'record',id:'record'})

    const nav=createElement({tagName:'nav',className:'nav',id:'nav'})
    const btnStop=getButton({text:'стоп',className:'btnStop',id:'btnStop',callBack:stopGame})
    const btnRestart=getButton({text:'Заново',className:'btnRestart',id:'btnRestart',callBack:restartGame})
    nav.append(
        btnStop,
        btnRestart
    )

    gameContainer.append(
        game,
        count,
        record,
        nav
    )

    const n=15
    const m=23
    const CellSize='30px'
    game.style.gridTemplateColumns=`repeat(${n},${CellSize})`
    game.style.gridAutoRows=`${CellSize}`
    game.style.width = `${CellSize.slice(0,CellSize.length-2)*n}px`
    const crtCell=(color)=>{
        const div=document.createElement('div')
        div.style.background=color
        div.className='cell'
        game.append(div)
    }
    for (let i = 0; i < n*m; i++) {
        crtCell('white')
    }
    game.getElementsByTagName('div')[0].style.borderTopLeftRadius='15px'
    game.getElementsByTagName('div')[new Point(n - 1,0).getIndex(n)].style.borderTopRightRadius='15px'
    game.getElementsByTagName('div')[new Point(n - 1,m - 1).getIndex(n)].style.borderBottomRightRadius='15px'
    game.getElementsByTagName('div')[new Point(0,m-1).getIndex(n)].style.borderBottomLeftRadius='15px'
    
    
    g=new GameManadger(FigureControllerConstrct(game.getElementsByTagName('div'),n,m),JSON.parse(sessionStorage.getItem('usersDataForGame')))
    
    count.innerText=0
    record.innerText=0
    
    return gameContainer
}
// export const TetrisInit=()=>{
    
    //     const gameContainer=createElement({tagName:'div',className:'gameContainer',id:'gameContainer'})
//     const app=document.getElementById('app')
//     app.append(gameContainer)

//     gameContainer.innerHTML=`
//     <div id="game" class="game">
//       </div>
//       <p id="count" class="count"></p>
//       <nav class="nav">
//           <button class="btnStop" id="btnStop">стоп</button>
//           <button class="btnRestart" id="btnRestart">Заново</button>
//       </nav>
//     `
//     const game=document.getElementById('game')
//     const btnStop=document.getElementById('btnStop')
//     const btnRestart=document.getElementById('btnRestart')
//     const count=document.getElementById('count')

//     const n=15
//     const m=23
//     const CellSize='30px'
//     game.style.gridTemplateColumns=`repeat(${n},${CellSize})`
//     game.style.gridAutoRows=`${CellSize}`
//     game.style.width = `${CellSize.slice(0,CellSize.length-2)*n}px`
//     const crtCell=(color)=>{
//         const div=document.createElement('div')
//         div.style.background=color
//         div.className='cell'
//         game.append(div)
//     }
//     for (let i = 0; i < n*m; i++) {
//         crtCell('white')
//     }
//     game.getElementsByTagName('div')[0].style.borderTopLeftRadius='15px'
//     game.getElementsByTagName('div')[new Point(n - 1,0).getIndex(n)].style.borderTopRightRadius='15px'
//     game.getElementsByTagName('div')[new Point(n - 1,m - 1).getIndex(n)].style.borderBottomRightRadius='15px'
//     game.getElementsByTagName('div')[new Point(0,m-1).getIndex(n)].style.borderBottomLeftRadius='15px'

//     // for (let i = 330; i < 345; i++) {
//     //     const listColor=['red', 'blue', 'orange', 'rgb(158, 158, 72)'/*yellow*/,'green','purple']
//     //     if(i===340){
//     //         continue
//     //     }
//     //     game.getElementsByTagName('div')[i].style.background=listColor[Math.round(Math.random()*100)%listColor.length]
//     // }


//     const g=new GameManadger(FigureControllerConstrct(game.getElementsByTagName('div'),n,m))
//     g.startGame()

//     btnStop.addEventListener('click',()=>{
//         g.stopGame()
//     })
//     let id=null
//     btnRestart.addEventListener('click',()=>{
//         g.deleteGame()
//         if(id){
//             clearTimeout(id)
//             id=null
//         }
//         if(!id){
//             id = setTimeout(()=>{
//                 g.startGame()
//             },200)
//         }
//     })
//     count.innerText=0
// }