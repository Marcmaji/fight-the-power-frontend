import { Component, OnInit } from '@angular/core';
import { InputManagerService } from 'src/app/services/input-manager.service';
import { Arena } from 'src/engine/arena';
import { Player } from 'src/engine/player';
import { EnabledKeys } from 'src/engine/utils/enabled-keys';
import { Position } from 'src/engine/utils/position';
import { Size } from 'src/engine/utils/size';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {

  arenaSize:Size = new Size(environment.arenaSize.width, environment.arenaSize.height)

  windowCenter: Position = new Position(window.innerWidth / 2, window.innerHeight / 2)

  playerList: Player[] = []
  mainPlayer: Player = new Player('0', new Position(0,0), new Size(0, 0), this.arenaSize)
  arena = new Arena(this.arenaSize, this.mainPlayer)

  constructor(private _inputManager: InputManagerService) { }

  ngOnInit(): void {
    this.addNewPlayer(new Player('123456', new Position(50, 50), new Size(20, 20), this.arenaSize))
    this.addNewPlayer(new Player('21536', new Position(1200, 450), new Size(20, 20), this.arenaSize))
    this.addNewPlayer(new Player('1235', new Position(900, 400), new Size(50, 20), this.arenaSize))
    this.addNewPlayer(new Player('987654', new Position(0, 0), new Size(30, 30), this.arenaSize))
    this.selectMainPlayer('1235')
    this._inputManager.keyEmitter.subscribe((keyPressed) => this.arena.moveArena(keyPressed))
    this._inputManager.keyEmitter.subscribe((keypressed) => this.mainPlayer.movePlayer(keypressed))
    this._inputManager.angleEmitter.subscribe((angle) => {
      this.mainPlayer.angle = angle
      this.arena.position = this.mainPlayer.position
    })
  }

  addNewPlayer(player: Player){
    this.playerList.push(player)
  }

  selectMainPlayer(id:string): void{
    this.mainPlayer = this.playerList.find((player) => player.id == id) ?? this.mainPlayer
    this.arena.mainPlayer = this.mainPlayer
    this.playerList = this.playerList.filter((player) => player.id != id)
  }

}
