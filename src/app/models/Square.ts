import { SquareColor } from "./SquareColor";

export class Square {
  row: number;
  column: number;
  color: SquareColor;
  isHovered: boolean = false;
  isPop: boolean = false;
  isWinning: boolean = false;

  constructor(row: number, column: number, color: SquareColor = SquareColor.Empty) {
    this.row = row;
    this.column = column;
    this.color = color;
  }

  hover() {
    this.isHovered = true;
  }

  out() {
    this.isHovered = false;
  }

  popHover() {
    this.isPop = true;
  }

  popOut() {
    this.isPop = false;
  }
}
