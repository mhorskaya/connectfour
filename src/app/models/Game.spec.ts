import { Game } from './Game';
import { Player } from './Player';
import { Square } from './Square';
import { SquareColor } from './SquareColor';

// position * = empty, R = red, Y = yellow
// column (+ means place piece, - means pop out) on that column index
// winner R = Player1, Y = Player2
let tests = [{
  "position": "*******|*******|*******|*******|**YYY**|**RRR**",
  "column": 5,
  "winner": "R",
  "turn": "R"
}, {
  "position": "*******|*******|*******|**YR***|**YR***|**YRR**",
  "column": 2,
  "winner": "Y",
  "turn": "Y"
}, {
  "position": "*******|*******|*******|**RY***|*RYY***|RYYRR**",
  "column": 3,
  "winner": "R",
  "turn": "R"
}, {
  "position": "*******|*******|**Y****|**RY***|*RRRY**|*RYYR**",
  "column": 5,
  "winner": "Y",
  "turn": "Y"
}, {
  "position": "*******|*******|*******|**Y****|**Y****|**YR*RR",
  "column": 4,
  "winner": "R",
  "turn": "R"
}, {
  "position": "*******|*Y*****|*YY****|*RYY***|*RRR**R|RRYRYYR",
  "column": 4,
  "winner": "Y",
  "turn": "Y"
}, {
  "position": "*******|******R|******R|******R|****YYY|***RYYR",
  "column": 6,
  "winner": "R",
  "turn": "R"
}, {
  "position": "*******|*******|*YYY***|RRYR***|YYRYR**|RRYRR**",
  "column": 0,
  "winner": "Y",
  "turn": "Y"
}, {
  "position": "R******|YR*****|RY*****|YRRR***|RYYYR*Y|YYRRYRY",
  "column": 2,
  "winner": "R",
  "turn": "R"
}, {
  "position": "*******|RRR****|YYY****|RRYY***|YYRYR**|RYRYRR*",
  "column": 3,
  "winner": "Y",
  "turn": "Y"
}, {
  "position": "*******|*****YY|****RRR|**YRRYY|**YRYRY|**YRYYR",
  "column": 3,
  "winner": "R",
  "turn": "R"
}, {
  "position": "*******|*******|*******|**YR***|*RRYR**|*YYRY**",
  "column": -3,
  "winner": "R",
  "turn": "R"
}, {
  "position": "*******|*******|*******|***Y***|YYYR*R*|RRRY*R*",
  "column": -3,
  "winner": "Y",
  "turn": "Y"
}, {
  "position": "*******|R******|YRR****|YRYY***|RYRR***|RYRYYY*",
  "column": -2,
  "winner": "R",
  "turn": "R"
}, {
  "position": "*******|*******|**YY***|*RRR***|RYRY***|YRYR***",
  "column": -2,
  "winner": "Y",
  "turn": "Y"
}, {
  "position": "*******|*******|**RR***|**YY***|**YRR**|**RYYR*",
  "column": -3,
  "winner": "R",
  "turn": "Y"
}];

describe('Game', () => {
  tests.forEach((test, index) => {
    it(`should pass test ${index}`, () => {
      expect(test.winner).toBe(getGameResult(test));
    });
  })
});

function getGameResult(test: { position: string; column: number; turn: string; }): string {
  const game: Game = new Game();
  let rows = test.position.split("|");
  for (let i = 0; i < Game.ROWS; i++) {
    let chars = rows[i].split("");
    for (let j = 0; j < Game.COLS; j++) {
      let char = chars[j];
      if (char === "R") {
        game.board[i][j] = new Square(i, j, SquareColor.Red);
      } else if (char === "Y") {
        game.board[i][j] = new Square(i, j, SquareColor.Yellow);
      } else if (char === "*") {
        game.board[i][j] = new Square(i, j, SquareColor.Empty);
      }
    }
  }

  game.turn = test.turn === "R" ? Player.Player1 : Player.Player2;

  if (test.column < 0) {
    game.popOutColumn(-test.column);
    game.isGameOver();
  } else {
    game.selectSquare(new Square(0, test.column));
  }

  return game.winner === Player.Player1 ? "R" : game.winner === Player.Player2 ? "Y" : "*";
}
