export class Size{
    // Size will be in absolute terms in px.
    
    private _height : number;
    private _width : number;

    constructor(width: number, height: number){
        this._height = height;
        this._width = width;
    }
    
    public get height() : number {
        return this._height;
    }
    public set height(v : number) {
        this._height = v;
    }
    
    public get width() : number {
        return this._width;
    }
    public set width(v : number) {
        this._width = v;
    }
}