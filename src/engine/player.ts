import { EnabledKeys } from "./utils/enabled-keys";
import { ExtendedMath } from "./utils/extended-math";
import { Position } from "./utils/position";
import { Size } from "./utils/size";

export class Player{
    
    private _id : string;
    private _position : Position;
    private _size : Size;
    private _arenaSize: Size
    private _speed : number;

    constructor(id: string, position: Position, size: Size, arenaSize: Size, speed: number = 3){
        this._id = id;
        this._position = new Position(ExtendedMath.clampValue(0, position.x, arenaSize.width),
        ExtendedMath.clampValue(0, position.y, arenaSize.height));
        this._size = size;
        this._arenaSize = arenaSize;
        this._speed = speed;
    }

    movePlayer(keyPressed: string[]){
        keyPressed.forEach((key) => {
            switch(key){
                case EnabledKeys.W:
                    this.position.y = ExtendedMath.clampValue(this.size.height / 2, this.position.y - this.speed, this.arenaSize.height - this.size.height / 2)
                    break
                case EnabledKeys.A:
                    this.position.x = ExtendedMath.clampValue(this.size.width / 2, this.position.x - this.speed, this.arenaSize.width - this.size.width / 2)
                    break
                case EnabledKeys.S:
                    this.position.y = ExtendedMath.clampValue(this.size.height / 2, this.position.y + this.speed, this.arenaSize.height - this.size.height / 2)
                    break
                case EnabledKeys.D:
                    this.position.x = ExtendedMath.clampValue(this.size.width / 2, this.position.x + this.speed, this.arenaSize.width - this.size.width / 2)
                    break
                default:
                    console.warn("Key pressed not considered")
                    break
            }
        })
    }

    public get id() : string {
        return this._id;
    }
    public set id(v : string) {
        this._id = v;
    }

    public get position() : Position {
        return this._position;
    }
    public set position(v : Position) {
        this._position = v;
    }
    
    public get size() : Size {
        return this._size;
    }
    public set size(v : Size) {
        this._size = v;
    }

    public get arenaSize() : Size {
        return this._arenaSize;
    }
    public set arenaSize(v : Size) {
        this._arenaSize = v;
    }

    public get speed() : number {
        return this._speed;
    }
    public set speed(v : number) {
        this._speed = v;
    }
}