import { Player } from "./Player";
import { Square } from "./Square";
import { SquareColor } from "./SquareColor";

export class Game {
  board: Square[][];
  turn: Player;
  isOver: boolean;
  winner: Player | undefined;

  public static readonly ROWS: number = 6;
  public static readonly COLS: number = 7;

  constructor() {
    this.board = [];
    this.turn = this.getRandomPlayer();
    this.isOver = false;
    this.winner = undefined;

    this.initBoard();
  }

  private getRandomPlayer(): Player {
    return Math.floor(Math.random() * 2) === 0 ? Player.Player1 : Player.Player2;
  }

  private initBoard(): void {
    for (let i = 0; i < Game.ROWS; i++) {
      this.board[i] = new Array<Square>(Game.COLS);
      for (let j = 0; j < Game.COLS; j++) {
        this.board[i][j] = new Square(i, j);
      }
    }
  }

  getDropSquare(column: number): Square | null {
    for (let i = Game.ROWS - 1; i >= 0; i--) {
      if (this.board[i][column].color === SquareColor.Empty) {
        return this.board[i][column];
      }
    }
    return null;
  }

  popOutColumn(column: number): void {
    for (let i = Game.ROWS - 1; i > 0; i--) {
      this.board[i][column] = new Square(i, column, this.board[i - 1][column].color);
    }
    this.board[0][column] = new Square(0, column);
  }

  changeTurn(): void {
    this.turn = this.getOpponent();
  }

  getOpponent(): Player {
    return this.turn === Player.Player1 ? Player.Player2 : Player.Player1;
  }

  getPlayerColor(player: Player): SquareColor {
    return player === Player.Player1 ? SquareColor.Red : SquareColor.Yellow;
  }

  enterSquare(square: Square): void {
    if (this.isGameOver()) return;

    if (square.row === Game.ROWS - 1 && square.color === this.getPlayerColor(this.turn)) {
      square.popHover();
    } else {
      this.getDropSquare(square.column)?.hover();
    }
  }

  leaveSquare(square: Square): void {
    if (this.isGameOver()) return;

    if (square.isPop) {
      square.popOut();
    }
    else {
      this.getDropSquare(square.column)?.out();
    }
  }

  selectSquare(square: Square): void {
    if (this.isGameOver()) return;

    if (square.isPop) {
      square.popOut();
      this.popOutColumn(square.column);
    } else {
      let dropSquare = this.getDropSquare(square.column)
      if (dropSquare !== null) {
        dropSquare.out();
        dropSquare.color = this.getPlayerColor(this.turn);
      }
    }

    if (!this.isGameOver()) {
      this.changeTurn();
      this.checkRemainingPieces();
    }
  }

  checkRemainingPieces(): void {
    if (this.getRemainingPieceCount() === 0) {
      if (!this.board[Game.ROWS - 1].some(sq => sq.color === this.getPlayerColor(this.turn))) {
        const errorMessage = "Since player doesn't have any remaining pieces left and no pop out operation is possible, the game is draw.";
        alert(errorMessage);
        throw new Error(errorMessage);
      }
    }
  }

  // A pop out may result both players having a straight.
  // In that case, the player whose turn it is wins.
  isGameOver(): boolean {
    if (this.isOver) {
      return true;
    }

    let color = this.getPlayerColor(this.turn);
    let result = this.checkVertical(color) || this.checkHorizontal(color) || this.checkDiagonal1(color) || this.checkDiagonal2(color);
    if (result) {
      this.winner = this.turn;
      this.isOver = true;
      return true;
    }

    color = this.getPlayerColor(this.getOpponent());
    result = this.checkVertical(color) || this.checkHorizontal(color) || this.checkDiagonal1(color) || this.checkDiagonal2(color);
    if (result) {
      this.winner = this.getOpponent();
      this.isOver = true;
      return true;
    }

    return false;
  }

  private checkVertical(status: SquareColor): boolean {
    for (let i = 0; i < Game.ROWS - 3; i++)
      for (let j = 0; j < Game.COLS; j++)
        if ([...Array(4).keys()].map(x => this.board[i + x][j].color).every(e => e === status)) {
          [...Array(4).keys()].map(x => this.board[i + x][j]).forEach(sq => sq.isWinning = true);
          return true;
        }
    return false;
  }

  private checkHorizontal(status: SquareColor): boolean {
    for (let i = 0; i < Game.ROWS; i++)
      for (let j = 0; j < Game.COLS - 3; j++)
        if ([...Array(4).keys()].map(x => this.board[i][j + x].color).every(e => e === status)) {
          [...Array(4).keys()].map(x => this.board[i][j + x]).forEach(sq => sq.isWinning = true);
          return true;
        }
    return false;
  }

  private checkDiagonal1(status: SquareColor): boolean {
    for (let i = 0; i < Game.ROWS - 3; i++)
      for (let j = 0; j < Game.COLS - 3; j++)
        if ([...Array(4).keys()].map(x => this.board[i + x][j + x].color).every(e => e === status)) {
          [...Array(4).keys()].map(x => this.board[i + x][j + x]).forEach(sq => sq.isWinning = true);
          return true;
        }
    return false;
  }

  private checkDiagonal2(status: SquareColor): boolean {
    for (let i = 0; i < Game.ROWS - 3; i++)
      for (let j = 3; j < Game.COLS; j++)
        if ([...Array(4).keys()].map(x => this.board[i + x][j - x].color).every(e => e === status)) {
          [...Array(4).keys()].map(x => this.board[i + x][j - x]).forEach(sq => sq.isWinning = true);
          return true;
        }
    return false;
  }

  private getRemainingPieceCount(): number {
    let pieceCount = 0;

    for (let i = 0; i < Game.ROWS; i++)
      for (let j = 0; j < Game.COLS; j++)
        if (this.board[i][j].color === this.getPlayerColor(this.turn))
          pieceCount++;

    return 21 - pieceCount;
  }
}
