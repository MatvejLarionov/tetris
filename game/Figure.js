import { Point } from "./Point";

export class Figure{
    constructor(){
        this.arr=[new Point(1,1)]
    }
    turn_clockwise(listPoint){
        const center = listPoint[0];
        
        let difference_x = 0;
        let difference_y = 0;
        
        for (let i = 1; i < listPoint.length; i++)
        {
            difference_x = center.x - listPoint[i].x;//0
            difference_y = center.y - listPoint[i].y;//1
            listPoint[i].x = center.x + difference_y;//2
            listPoint[i].y = center.y - difference_x;//1

        }
        return listPoint;
    }
    turn_counterclockwise(listPoint){
        const center = listPoint[0];

        let difference_x = 0;
        let difference_y = 0;

        for (let i = 1; i < listPoint.length; i++)
        {
            difference_x = center.x - listPoint[i].x;//0
            difference_y = center.y - listPoint[i].y;//1
            listPoint[i].x = center.x - difference_y;//2
            listPoint[i].y = center.y + difference_x;//1

        }
        return listPoint;
    }
}
export class Figure_T extends Figure{
        arr= this.arr.concat([new Point(0,1),new Point(2,1),new Point(1,2),])
}
export class Figure_Z extends  Figure{
        arr= this.arr.concat([new Point(0,0),new Point(1,0),new Point(2,1),])
}
export class Figure_S extends  Figure{
        arr= this.arr.concat([new Point(0,1),new Point(1,0),new Point(2,0),])
}
export class Figure_I extends  Figure{
        arr= this.arr.concat([new Point(1,0),new Point(1,2)])
}

export class Figure_O extends  Figure{
        // arr= this.arr.concat([new Point(2,1),new Point(1,2),new Point(2,2),])
}
export class Figure_L extends  Figure{
        arr= this.arr.concat([new Point(1,0),new Point(1,2),new Point(2,2),])
}
export class Figure_J extends  Figure{
        arr= this.arr.concat([new Point(1,0),new Point(1,2),new Point(0,2),])
}