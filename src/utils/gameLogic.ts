/* eslint-disable @typescript-eslint/no-unused-vars */
import BoardClass from "./Game";
import { getEmptyCells } from "./helpers/getEmptyCells";
import { switchPlayer } from "./helpers/switchPlayer";
import { LevelType } from "./types/Level";
import { Mark } from "./types/Mark";

const multiplierMark = {
  x: 1,
  o: -1,
};

const makeMove = (cell: number, player: Mark, cellsValue: Mark[]) => {
  if (cellsValue[cell] === null) {
    cellsValue[cell] = player;
  }
  return cellsValue;
};

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const calculateWinner = (cellValue: Mark[]): Mark => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      cellValue[a] &&
      cellValue[a] === cellValue[b] &&
      cellValue[a] === cellValue[c]
    ) {
      return cellValue[a];
    }
  }
  return null;
};

const findLine = (line: Mark[], cells: Mark[]) => {
  return lines.filter((cellIndexes) => {
    const lineValues = cellIndexes.map((index) => cells[index]);
    return JSON.stringify(line.sort()) === JSON.stringify(lineValues.sort());
  });
};

// три уровня сложности
// выбор размера игрового поля

export const nextComputerMove = (
  computerMark: Mark,
  cellsValue: Mark[],
  setValue: (index: number) => void,
  level: LevelType
) => {
  switch (level) {
    case "easy": {
      const emptyIndexes = getEmptyCells(cellsValue);

      const randomIndex =
        emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

      randomIndex !== null && setValue(randomIndex);
      break;
    }

    case "medium": {
      const playerMark: Mark = computerMark === "x" ? "o" : "x";
      const lostLine = findLine(
        [playerMark, playerMark, playerMark],
        cellsValue
      );
      const winLine = findLine([computerMark, computerMark, null], cellsValue);
      const blockLine = findLine([playerMark, playerMark, null], cellsValue);
      const defaultLine = findLine([computerMark, null, null], cellsValue);

      if (lostLine.length > 0) {
        return;
      }

      if (winLine.length > 0) {
        const winIndex = winLine[0].filter(
          (index) => cellsValue[index] === null
        )[0];
        setValue(winIndex);
        return;
      }

      if (blockLine.length > 0) {
        const blockIndex = blockLine[0].filter(
          (index) => cellsValue[index] === null
        )[0];
        setValue(blockIndex);
        return;
      }

      if (defaultLine.length > 0) {
        const defaultIndex = defaultLine[0].filter(
          (index) => cellsValue[index] === null
        )[0];
        setValue(defaultIndex);
        return;
      }

      const emptyIndexes = getEmptyCells(cellsValue);

      const randomIndex =
        emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];

      randomIndex !== null && setValue(randomIndex);
      break;
    }

    // case "hard": {
    //   const index = minimax(computerMark, cellsValue)?.[1]
    //   console.log(2, index)
    //   setValue(index as number);
    // }
  }
};

// export const minimax = (cellsValue: Mark[], mark: Mark ) => {
//   if (mark) {
//     const multiplier = multiplierMark[mark];
//     let thisScore: number;
//     let maxScore = -1;
//     let bestMove: number | null = null;
//     const copyCellsValue = [...cellsValue]
//     const emptyIndexes = getEmptyCells(cellsValue)
//     const winner = calculateWinner(cellsValue)
//     if (winner) {
//       return
//     }
//     emptyIndexes.forEach((index) => {
//       const newCellsValue = makeMove(index, mark, copyCellsValue)
//       console.log(newCellsValue)
//       thisScore = multiplier * minimax(newCellsValue, switchPlayer(mark))?.[0];
//       if (thisScore >= maxScore) {
//         maxScore = thisScore;
//         bestMove = index;
//       }
//     })
//     console.log([multiplier * maxScore, bestMove])
//     return [multiplier * maxScore, bestMove];
//   }

// };

export const minimax = (
  board: BoardClass,
  player: Mark
): [number, number | null] => {
  if (player) {
    const multiplier = multiplierMark[player];
    let thisScore;
    let maxScore = -1;
    let bestMove = null;
    const winner = board.getWinner();
    if (winner !== null) {
      return [multiplierMark[winner], 0];
    } else {
      for (const square of board.getEmptySquares()) {
        const copy: BoardClass = board.clone();
        copy.makeMove(square, player);
        // console.log(copy.grid)
        thisScore = multiplier * minimax(copy, switchPlayer(player))[0];

        if (thisScore >= maxScore) {
          maxScore = thisScore;
          bestMove = square;
        }
      }
      // console.log([multiplier * maxScore, bestMove])
      return [multiplier * maxScore, bestMove];
    }
  }
  return [0, 0]
};
