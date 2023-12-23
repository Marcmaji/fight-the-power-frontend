export class Position{
        
    private _x : number;
    private _y : number;

    constructor(x: number, y: number){
        this._x = x;
        this._y = y;
    }
    
    public get x() : number {
        return this._x;
    }
    public set x(v : number) {
        this._x = v;
    }
    
    public get y() : number {
        return this._y;
    }
    public set y(v : number) {
        this._y = v;
    }
}