export class Point{
    constructor(x,y){
        this.x=x
        this.y=y
    }
    getIndex(n){
        return n * this.y + this.x
    }
    ConvertToNewPoint(arr,point){
        const differenceX=point.x-arr[0].x
        const differenceY=point.y-arr[0].y
        
        return arr.map(item=>{
            return new Point(item.x + differenceX,item.y + differenceY)
        })
    }
}