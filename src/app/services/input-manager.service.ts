import { EventEmitter, Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { EnabledKeys } from 'src/engine/utils/enabled-keys';
import { Position } from 'src/engine/utils/position';

@Injectable({
  providedIn: 'root'
})
export class InputManagerService {

  private keyPressed: string[] = []
  keyEmitter: EventEmitter<string[]> = new EventEmitter()
  angleEmitter: EventEmitter<number> = new EventEmitter()

  private emissionSubscription: Subscription = new Subscription();
  constructor() { }

  addKey(key: string){
    if(this.validateInput(key)){
      if (!this.keyPressed.includes(key)){
        if(this.keyPressed.length == 0){
          this.emissionSubscription = interval(10).subscribe(() => this.keyEmitter.emit(this.keyPressed))  
        }
        this.keyPressed.push(key)
      } 
    } 
  }

  removeKey(key: string){
    if(this.validateInput(key)){
      this.keyPressed = this.keyPressed.filter((keypressed) => keypressed != key)
      if(this.keyPressed.length == 0){
        this.emissionSubscription.unsubscribe()
      }
    }
  }

  validateInput(key: string) : boolean{
    return key == EnabledKeys.W || key == EnabledKeys.A || key == EnabledKeys.S || key == EnabledKeys.D
  }

  generateAngleFromMousePosition(mousePos: Position){
    this.angleEmitter.emit(Math.atan2(window.innerHeight/2 - mousePos.y, window.innerWidth/2 - mousePos.x) * 180 / Math.PI)
  }
}
