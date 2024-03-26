import { Mark } from "./types/Mark";
import { Winner } from "./types/Winner";

const winningLines = {
  3: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  5: [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ],
};

export default class BoardState {
  cells: Mark[];
  dimension: number;
  constructor(dimension: number, cells?: Mark[]) {
    this.cells = cells || new Array(dimension ** 2).fill(null);
    this.dimension = dimension;
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
    return this.getEmptySquares(cells).length === this.dimension ** 2;
  };

  getWinner = (cells = this.cells): Winner => {
    if (this.dimension === 3 || this.dimension === 5) {
      const winningCombos = winningLines[this.dimension];
      let result: Winner = null;
      winningCombos.forEach((el) => {
        if (
          cells[el[0]] !== null &&
          cells[el[0]] === cells[el[1]] &&
          cells[el[0]] === cells[el[2]] &&
          (this.dimension === 5
            ? cells[el[0]] === cells[el[3]] && cells[el[0]] === cells[el[4]]
            : true)
        ) {
          result = cells[el[0]];
        } else if (
          result === null &&
          this.getEmptySquares(cells).length === 0
        ) {
          result = "draw";
        }
      });
      return result;
    }
    return null;
  };

  clone = () => {
    return new BoardState(this.dimension, this.cells.slice());
  };
}
