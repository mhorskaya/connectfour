import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() turn!: Player;
  @Input() winner: Player | undefined;
  @Output() onRestartEvent: EventEmitter<void> = new EventEmitter();

  onRestart(): void {
    this.onRestartEvent.emit();
  }

  getGameOverText(): string {
    return `Player ${this.winner === Player.Player1 ? "1" : "2"} wins. Click to restart game.`;
  }

  isGameOver(): boolean {
    return this.winner !== undefined;
  }

  isPlayer1Turn(): boolean {
    return this.winner === undefined && this.turn === Player.Player1;
  }

  isPlayer2Turn(): boolean {
    return this.winner === undefined && this.turn === Player.Player2;
  }
}
