import { EventEmitter, Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { EnabledKeys } from 'src/engine/utils/enabled-keys';

@Injectable({
  providedIn: 'root'
})
export class InputManagerService {

  private keyPressed: string[] = []
  keyEmitter: EventEmitter<string[]> = new EventEmitter()

  private emissionSubscription: Subscription = new Subscription();
  constructor() { }

  addKey(key: string){
    if(this.validateInput(key)){
      if (!this.keyPressed.includes(key)){
        if(this.keyPressed.length == 0){
          console.log("starting interval")
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
}
