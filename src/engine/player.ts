import { EnabledKeys } from "./utils/enabled-keys";
import { ExtendedMath } from "./utils/extended-math";
import { Position } from "./utils/position";
import { Size } from "./utils/size";

export class Player{
    
    private _id : string;
    private _position : Position; // position with arena top left corner as origin
    private _size : Size;
    private _arenaSize: Size
    private _speed : number;
    private _angle : number;
    private _boundingBox : Size;
    
    constructor(id: string, position: Position, size: Size, arenaSize: Size, speed: number = 3, angle = 0){
        this._id = id;
        this._size = size
        this._boundingBox = new Size(Math.abs(this.size.width * Math.cos(angle * Math.PI / 180)) + Math.abs(this.size.height * Math.sin(angle * Math.PI / 180)),
        Math.abs(this.size.width * Math.sin(angle * Math.PI / 180)) + Math.abs(this.size.height * Math.cos(angle * Math.PI / 180)));
        this._position = new Position(ExtendedMath.clampValue(this.boundingBox.width / 2, position.x, arenaSize.width - this.boundingBox.width / 2),
        ExtendedMath.clampValue(this.boundingBox.height / 2, position.y, arenaSize.height - this.boundingBox.height / 2));
        this._arenaSize = arenaSize;
        this._speed = speed;
        this._angle = angle;
    }

    movePlayer(keyPressed: string[]){
        keyPressed.forEach((key) => {
            switch(key){
                case EnabledKeys.W:
                    this.position.y = ExtendedMath.clampValue(this.boundingBox.height / 2, this.position.y - this.speed, this.arenaSize.height - this.boundingBox.height / 2)
                    break
                case EnabledKeys.A:
                    this.position.x = ExtendedMath.clampValue(this.boundingBox.width / 2, this.position.x - this.speed, this.arenaSize.width - this.boundingBox.width / 2)
                    break
                case EnabledKeys.S:
                    this.position.y = ExtendedMath.clampValue(this.boundingBox.height / 2, this.position.y + this.speed, this.arenaSize.height - this.boundingBox.height / 2)
                    break
                case EnabledKeys.D:
                    this.position.x = ExtendedMath.clampValue(this.boundingBox.width / 2, this.position.x + this.speed, this.arenaSize.width - this.boundingBox.width / 2)
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
        this._position = new Position(ExtendedMath.clampValue(0, v.x, this.arenaSize.width),
        ExtendedMath.clampValue(0, v.y, this.arenaSize.height));;
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

    public get angle() : number {
        return this._angle;
    }
    public set angle(v : number) {
        this._angle = v;
        this._boundingBox = new Size(Math.abs(this.size.width * Math.cos(v * Math.PI / 180)) + Math.abs(this.size.height * Math.sin(v * Math.PI / 180)),
        Math.abs(this.size.width * Math.sin(v * Math.PI / 180)) + Math.abs(this.size.height * Math.cos(v * Math.PI / 180)));
    }

    public get boundingBox() : Size {
        return this._boundingBox;
    }
    public set boundingBox(v : Size) {
        this._boundingBox = v;
    }
}