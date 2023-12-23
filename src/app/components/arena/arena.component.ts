import { Component, OnInit } from '@angular/core';
import { InputManagerService } from 'src/app/services/input-manager.service';
import { Arena } from 'src/engine/arena';
import { Player } from 'src/engine/player';
import { EnabledKeys } from 'src/engine/utils/enabled-keys';
import { Position } from 'src/engine/utils/position';
import { Size } from 'src/engine/utils/size';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {

  arenaSize:Size = new Size(1500, 900)

  windowCenter: Position = new Position(window.innerWidth / 2, window.innerHeight / 2)

  playerList: Player[] = []
  mainPlayer: Player = new Player('987654', new Position(0, 0), new Size(20, 20), this.arenaSize)
  arena = new Arena(this.mainPlayer.position, this.arenaSize, this.mainPlayer)

  constructor(private _inputManager: InputManagerService) { }

  ngOnInit(): void {
    this.addNewPlayer(new Player('123456', new Position(50, 50), new Size(20, 20), this.arenaSize))
    this.addNewPlayer(new Player('21536', new Position(1200, 450), new Size(20, 20), this.arenaSize))
    this.addNewPlayer(new Player('123456', new Position(900, 400), new Size(20, 20), this.arenaSize))
    this._inputManager.keyEmitter.subscribe((keyPressed) => this.arena.moveArena(keyPressed))
    this._inputManager.keyEmitter.subscribe((keypressed) => this.mainPlayer.movePlayer(keypressed))
  }

  addNewPlayer(player: Player){
    this.playerList.push(player)
  }

}
