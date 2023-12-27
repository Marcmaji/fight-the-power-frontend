import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Player } from 'src/engine/player';
import { Position } from 'src/engine/utils/position';
import { Size } from 'src/engine/utils/size';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent {

  showForm: boolean = true

  checkoutForm = this.formBuilder.group({
    id: '',
    width: 0,
    height: 0
  });

  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  onSubmit(): void {
    this.http.post<Player[]>("localhost:8080/player", new Player(this.checkoutForm.value.id ?? "", 
      new Position(Math.random() * environment.arenaSize.width, Math.random() * environment.arenaSize.height), 
      new Size(this.checkoutForm.value.width ?? 10, this.checkoutForm.value.height ?? 10), 
      new Size(environment.arenaSize.width, environment.arenaSize.height)), this._options)
      .subscribe((response) => console.log(response));
    this.checkoutForm.reset()
    this.showForm = false
  }
}
