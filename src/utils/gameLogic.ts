import { LevelType } from "./types/Level";
import { Mark } from "./types/Mark";

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
      const emptyIndexes = cellsValue
        .map((cell, index) => (cell === null ? index : null))
        .filter((val) => val !== null);

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

      const emptyIndexes = cellsValue
        .map((cell, index) => (cell === null ? index : null))
        .filter((val) => val !== null);

      const randomIndex =
        emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];

      randomIndex !== null && setValue(randomIndex);
      break;
    }
  }
};
