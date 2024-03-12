import { Point } from "./Point";
import { Figure , Figure_I,Figure_J,Figure_L,Figure_O,Figure_S,Figure_T,Figure_Z } from "./Figure";
import { Field } from "./Field";
import { FigureController } from "./FigureController";
import { patchUser } from "../api/patchUser";
import { getUserRecord } from "../api/getUserRecord";



function listenerKeys(event){
    if(event.code==='KeyA'){
        this.tryMovLeft()
    }
    if(event.code==='KeyD'){
        this.tryMovRight()
    }
    if(event.code==='KeyW'){
        this.tryTurnClockwise()
    }
    if(event.code==='KeyS'){
        this.tryTurnCounterclockwise()
    }
}

function listenerButtons(event){
    if(event.target.id==='btnLeft'){
        this.tryMovLeft()
    }
    if(event.target.id==='btnRight'){
        this.tryMovRight()
    }
    if(event.target.id==='btnTurnClockwise'){
        this.tryTurnClockwise()
    }
    if(event.target.id==='btnTurnCounterclockwise'){
        this.tryTurnCounterclockwise()
    }
}

export class GameManadger{
    constructor(figContr,id){
        this.figContr=figContr
        this.isContinue=true
        this.isSetNewFigure=true
        this.count=0
        this.userData={
            record:null,
            id:id
        }
        getUserRecord(id).then(record=>{
            this.userData.record=record
            document.getElementById('record').innerText=this.userData.record
        })
        listenerKeys=listenerKeys.bind(this)
        listenerButtons=listenerButtons.bind(this)
    }
    setNewFigure(){
        const listColor=['red', 'blue', 'orange', 'rgb(158, 158, 72)'/*yellow*/,'green','purple']
        const listFigure=[new Figure_T(),new Figure_Z(),new Figure_S(),new Figure_I(),new Figure_O(),new Figure_L(), new Figure_J()]
        this.figContr.realyColor= listFigure[Math.round(Math.random()*100)%listFigure.length].arr
        this.figContr.color=listColor[Math.round(Math.random()*100)%listColor.length]
        
        let num=Math.round(Math.random()*100)%(this.figContr.field.n)
        while (!this.figContr.canSetFigureOnField(new Point(num,-1))) {
            num=Math.round(Math.random()*100)%this.figContr.field.n
        }
        this.figContr.setFigureOnField(new Point(num,-1))
    }
    movDown(){
        this.figContr.movFigure(new Point(this.figContr.realyColor[0].x,this.figContr.realyColor[0].y+1))
    }
    canMovDown(){
        return this.figContr.canSetFigureOnField(new Point(this.figContr.realyColor[0].x,this.figContr.realyColor[0].y +1))
    }

    tryMovRight(){
        if(this.figContr.canSetFigureOnField(new Point(this.figContr.realyColor[0].x+1,this.figContr.realyColor[0].y))){
            this.figContr.movFigure(new Point(this.figContr.realyColor[0].x+1,this.figContr.realyColor[0].y))
        }
    }
    tryMovLeft(){
        if(this.figContr.canSetFigureOnField(new Point(this.figContr.realyColor[0].x-1,this.figContr.realyColor[0].y))){
            this.figContr.movFigure(new Point(this.figContr.realyColor[0].x-1,this.figContr.realyColor[0].y))
        }
    }
    tryTurnClockwise(){
        if(this.figContr.canTurn_clockwise()){
            this.figContr.turn_clockwise(this.figContr.realyColor)
        }
    }
    tryTurnCounterclockwise(){
        if(this.figContr.canTurn_counterclockwise()){
            this.figContr.turn_counterclockwise(this.figContr.realyColor)
        }
    }
    findFilledRows(){
        const res=[]
        for (let i = 0; i < this.figContr.field.m; i++) {
            const temp=Object.values(this.figContr.field.field).slice(new Point(0,i).getIndex(this.figContr.field.n),new Point(this.figContr.field.n,i).getIndex(this.figContr.field.n))
            if(-1===temp.findIndex(item=>item.style.background==='white')){
                res.push(i)
            }
        }
        return res
    }
    deleteRows(){
        const n=this.figContr.field.n
        const m = this.figContr.field.m
        const field=this.figContr.field.field
        this.count += 10 * this.findFilledRows().map(item=>{
            for (let i = new Point(n-1,item).getIndex(n); i - n >= 0; i--) {
                field[i].style.background=field[i-n].style.background
                // field[i-1].style.background='white'
            }
        }).length
        document.getElementById('count').innerText=this.count
        if(this.count>this.userData.record){
            this.userData.record=this.count
            document.getElementById('record').innerText=this.count
            patchUser(this.userData)
        }
    }
    isGameOver(){
        // console.log(this.figContr.realyColor)
        return -1!==this.figContr.realyColor.findIndex(item=>item.y<0)
    }
    movingDown(){
        const timeOfMovdown=150
        if (this.isSetNewFigure) {
            this.setNewFigure()
        }
        else{
            this.isSetNewFigure=true
        }
        const id=setInterval(() => {
            if(!this.isContinue){
                clearInterval(id)
                this.stopGame()
                return
            }
            if(this.canMovDown()){
                this.movDown()
            }
            else {
                clearInterval(id)
                this.deleteRows()
                if(this.isGameOver()){
                    this.stopGame()
                    return
                }
                this.movingDown()
            }
        }, timeOfMovdown);
    }
    startGame(){
        this.isContinue=true
        this.movingDown()
        document.addEventListener('keydown',listenerKeys)
        document.addEventListener('click',listenerButtons)
        // document.addEventListener('keydown',event=>{
        //     if(event.code==='KeyA'&&this.figContr.canSetFigureOnField(new Point(this.figContr.realyColor[0].x-1,this.figContr.realyColor[0].y))){
        //         this.figContr.movFigure(new Point(this.figContr.realyColor[0].x-1,this.figContr.realyColor[0].y))
        //     }
        //     if(event.code==='KeyD'&&this.figContr.canSetFigureOnField(new Point(this.figContr.realyColor[0].x+1,this.figContr.realyColor[0].y))){
        //         this.figContr.movFigure(new Point(this.figContr.realyColor[0].x+1,this.figContr.realyColor[0].y))
        //     }
        //     if(event.code==='KeyW' && this.figContr.canTurn_clockwise()){
        //         this.figContr.turn_clockwise(this.figContr.realyColor)
        //     }
        //     if(event.code==='KeyS' && this.figContr.canTurn_counterclockwise()){
                
        //         this.figContr.turn_counterclockwise(this.figContr.realyColor)
        //     }
        // })
    }
    stopGame(){
        this.isContinue=false
        this.isSetNewFigure=false
        document.removeEventListener('keydown',listenerKeys)
        document.removeEventListener('click',listenerButtons)
    }
    deleteGame(){
        this.stopGame()
        this.isSetNewFigure=true
        this.count=0
        count.innerText=this.count
        Object.values(this.figContr.field.field).forEach(item=>{
            item.style.background='white'
        })
    }
}
export const FigureControllerConstrct=(field,n,m)=>{
    return new FigureController(new Field(field,n,m),new Figure_T(),'red')
}