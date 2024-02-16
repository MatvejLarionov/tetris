import { Point } from "./Point";
import { Figure } from "./Figure";

export class FigureController{
    constructor(field,figure,color){
        this.field=field
        this.figure=figure
        this.color=color
        this.realyColor=figure.arr
    }
    func(point){
        return point.x>=0 && point.y>=0 && point.x<this.field.n && point.y<this.field.m
    }
    setFigureOnField(point){
        this.realyColor= new Point().ConvertToNewPoint(this.realyColor,point)
        this.realyColor.filter(item=>this.func(item)).map(item=>{
            this.field.field[item.getIndex(this.field.n)].style.background=this.color
        })
    }
    deleteFigure(){
        this.realyColor.filter(item=>this.func(item)).map(item=>{
            this.field.field[item.getIndex(this.field.n)].style.background='white'
        })
    }
    movFigure(point){
        this.deleteFigure()
        this.setFigureOnField(point)
    }
    turn_clockwise(){
        this.deleteFigure()
        this.realyColor=new Figure().turn_clockwise(this.realyColor)
        this.realyColor.filter(item=>this.func(item)).map(item=>{
            this.field.field[item.getIndex(this.field.n)].style.background=this.color
        })
    }
    turn_counterclockwise(){
        this.deleteFigure()
        this.realyColor=new Figure().turn_counterclockwise(this.realyColor)
        this.realyColor.filter(item=>this.func(item)).map(item=>{
            this.field.field[item.getIndex(this.field.n)].style.background=this.color
        })
    }

    canSetFigureOnField(point, list=this.realyColor){
        const temp=new Point().ConvertToNewPoint(list,point)
        for (let i = 0; i < temp.length; i++) {
            if(temp[i].x<0|| temp[i].x>=this.field.n||temp[i].y>=this.field.m){
                return false
            }
        }
        return -1===temp.filter(item=>item.y>=0).findIndex(item=>{
            if(JSON.stringify(this.realyColor).includes(JSON.stringify(item))){
                return false
            }
            // console.log(this.field.field[item.getIndex(this.field.n)])
            // console.log(item)
            // console.log()
            return this.field.field[item.getIndex(this.field.n)].style.background!=='white'
        })
        // return true
    }
    canTurn_clockwise(){
        return this.canSetFigureOnField(this.realyColor[0],new Figure().turn_clockwise(Object.values(JSON.parse(JSON.stringify(this.realyColor)))))
        // return true
    }
    canTurn_counterclockwise(){
        return this.canSetFigureOnField(this.realyColor[0],new Figure().turn_counterclockwise(Object.values(JSON.parse(JSON.stringify(this.realyColor)))))
    }
}