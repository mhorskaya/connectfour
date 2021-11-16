import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { Square } from 'src/app/models/Square';
import { SquareColor } from 'src/app/models/SquareColor';
import { Color } from './Color';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  @Input() square!: Square;
  @Input() turn!: Player;
  @Output() mouseOverEvent: EventEmitter<Square> = new EventEmitter();
  @Output() mouseOutEvent: EventEmitter<Square> = new EventEmitter();
  @Output() clickEvent: EventEmitter<Square> = new EventEmitter();

  getSquareColor(): string {
    if (this.square.isPop) {
      return Color.Black;
    }
    if (this.square.isHovered) {
      return this.turn === Player.Player1 ? Color.LightRed : Color.LightYellow;
    }
    if (this.square.color === SquareColor.Red) {
      return Color.Red;
    }
    if (this.square.color === SquareColor.Yellow) {
      return Color.Yellow;
    }
    return Color.White;
  }

  onMouseOver(): void {
    this.mouseOverEvent.emit(this.square);
  }

  onMouseOut(): void {
    this.mouseOutEvent.emit(this.square);
  }

  onClick(): void {
    this.clickEvent.emit(this.square);
  }
}

