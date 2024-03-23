// import { DIMENSIONS, DRAW } from "./constants";

import { Mark } from "./types/Mark";
import { Winner } from "./types/Winner";

export default class BoardClass {
  grid: Mark[];
  constructor(grid?: Mark[]) {
    this.grid = grid || new Array(3 ** 2).fill(null);
  }

  makeMove = (square: number, player: Mark) => {
    if (this.grid[square] === null) {
      this.grid[square] = player;
    }
  };

  // Collect indices of empty squares and return them
  getEmptySquares = (grid = this.grid) => {
    const squares: number[] = [];
    grid.forEach((square, i) => {
      if (square === null) squares.push(i);
    });
    return squares;
  };

  isEmpty = (grid = this.grid) => {
    return this.getEmptySquares(grid).length === 3 ** 2;
  };

  getWinner = (grid = this.grid): Mark => {
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
    let res: Winner = null;
    winningCombos.forEach((el) => {
      if (
        grid[el[0]] !== null &&
        grid[el[0]] === grid[el[1]] &&
        grid[el[0]] === grid[el[2]]
      ) {
        res = grid[el[0]];
      } else if (res === null && this.getEmptySquares(grid).length === 0) {
        res = "draw";
      }
    });
    console.log(res);
    return res;
  };

  clone = () => {
    return new BoardClass(this.grid.concat());
  };
}
