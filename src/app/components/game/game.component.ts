import { Component } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { Square } from 'src/app/models/Square';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  game: Game;

  constructor() {
    this.game = new Game();
  }

  onRestart(): void {
    this.game = new Game();
  }

  onMouseOver(square: Square): void {
    this.game.enterSquare(square);
  }

  onMouseOut(square: Square): void {
    this.game.leaveSquare(square);
  }

  onClick(square: Square): void {
    this.game.selectSquare(square);
  }
}
