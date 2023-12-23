import { Component, HostListener } from '@angular/core';
import { InputManagerService } from './services/input-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fight-the-power';

  constructor(private _inputManager: InputManagerService){}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardDown(event: KeyboardEvent) { 
    this._inputManager.addKey(event.key.toLowerCase());
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardUp(event: KeyboardEvent) { 
    this._inputManager.removeKey(event.key.toLowerCase());
  }

  /* @HostListener('document:mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) { 
    console.log(event.clientX, event.clientY);
  } */
}
