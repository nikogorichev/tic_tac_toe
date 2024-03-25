// import { DIMENSIONS, DRAW } from "./constants";

import { Mark } from "./types/Mark";
import { Winner } from "./types/Winner";

export default class BoardState {
  cells: Mark[];
  constructor(cells?: Mark[]) {
    this.cells = cells || new Array(3 ** 2).fill(null);
  }

  makeMove = (square: number, player: Mark) => {
    if (this.cells[square] === null) {
      this.cells[square] = player;
    }
  };

  getEmptySquares = (cells = this.cells) => {
    const squares: number[] = [];
    cells.forEach((cell, i) => {
      if (cell === null) squares.push(i);
    });
    return squares;
  };

  isEmpty = (cells = this.cells) => {
    return this.getEmptySquares(cells).length === 3 ** 2;
  };

  getWinner = (cells = this.cells): Mark => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let result: Winner = null;
    winningCombos.forEach((el) => {
      if (
        cells[el[0]] !== null &&
        cells[el[0]] === cells[el[1]] &&
        cells[el[0]] === cells[el[2]]
      ) {
        result = cells[el[0]];
      } else if (result === null && this.getEmptySquares(cells).length === 0) {
        result = "draw";
      }
    });
    return result;
  };

  clone = () => {
    return new BoardState(this.cells.concat());
  };
}
