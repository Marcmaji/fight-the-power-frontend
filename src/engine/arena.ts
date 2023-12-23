import { Player } from "./player";
import { EnabledKeys } from "./utils/enabled-keys";
import { ExtendedMath } from "./utils/extended-math";
import { Position } from "./utils/position";
import { Size } from "./utils/size";

export class Arena{
    
    private _position : Position;
    private _size : Size;
    private _mainPlayer : Player;

    private arenaUperBound: number = window.innerHeight / 2
    private arenaLowerBound: number
    private arenaLeftMostBound: number = window.innerWidth / 2
    private arenaRightMostBound: number; 

    constructor(size: Size, mainPlayer: Player){
        this.arenaRightMostBound = innerWidth / 2 - size.width
        this.arenaLowerBound = innerHeight / 2 - size.height
        this._position = new Position(ExtendedMath.clampValue(this.arenaRightMostBound + mainPlayer.size.width / 2, -mainPlayer.position.x + this.arenaLeftMostBound, this.arenaLeftMostBound - mainPlayer.size.width / 2),
        ExtendedMath.clampValue(this.arenaLowerBound + mainPlayer.size.width / 2, -mainPlayer.position.y + this.arenaUperBound, this.arenaUperBound - mainPlayer.size.width / 2));
        this._size = size;
        this._mainPlayer = mainPlayer
    }

    moveArena(keyPressed: string[]){
        keyPressed.forEach((key) => {
            switch(key){
                case EnabledKeys.W:
                    this.position.y = ExtendedMath.clampValue(this.arenaLowerBound + this.mainPlayer.size.height / 2, this.position.y + this.mainPlayer.speed, this.arenaUperBound - this.mainPlayer.size.height / 2)
                    break
                case EnabledKeys.A:
                    this.position.x = ExtendedMath.clampValue(this.arenaRightMostBound + this.mainPlayer.size.width / 2, this.position.x + this.mainPlayer.speed, this.arenaLeftMostBound - this.mainPlayer.size.width / 2)
                    break
                case EnabledKeys.S:
                    this.position.y = ExtendedMath.clampValue(this.arenaLowerBound + this.mainPlayer.size.height / 2, this.position.y - this.mainPlayer.speed, this.arenaUperBound - this.mainPlayer.size.height / 2)
                    break
                case EnabledKeys.D:
                    this.position.x = ExtendedMath.clampValue(this.arenaRightMostBound + this.mainPlayer.size.width / 2, this.position.x - this.mainPlayer.speed, this.arenaLeftMostBound - this.mainPlayer.size.width / 2)
                    break
                default:
                    console.warn("Key pressed not considered")
                    break
            }
        })
    }

    public get position() : Position {
        return this._position;
    }
    public set position(v : Position) {
        this._position = new Position(ExtendedMath.clampValue(this.arenaRightMostBound + this.mainPlayer.size.width / 2, -v.x + this.arenaLeftMostBound, this.arenaLeftMostBound - this.mainPlayer.size.width / 2),
        ExtendedMath.clampValue(this.arenaLowerBound + this.mainPlayer.size.width / 2, -v.y + this.arenaUperBound, this.arenaUperBound - this.mainPlayer.size.width / 2));;
    }
    
    public get size() : Size {
        return this._size;
    }
    public set size(v : Size) {
        this._size = v;
    }

    public get mainPlayer() : Player {
        return this._mainPlayer;
    }
    public set mainPlayer(v : Player) {
        this._mainPlayer = v;
        this.position = this.mainPlayer.position
        this.size = this.mainPlayer.size
    }
    
}