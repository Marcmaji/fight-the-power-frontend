import { Component, Input, OnInit } from '@angular/core';
import { Position } from 'src/engine/utils/position';
import { Size } from 'src/engine/utils/size';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() id: string = '';
  @Input() position: Position = new Position(0, 0)
  @Input() size: Size = new Size(10, 10)

  constructor() { }

  ngOnInit(): void {
  }
}
