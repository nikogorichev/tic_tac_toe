/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

const calculateWinner = (cellValue: string[]) => {
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

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  return <></>;
};

export default Board;
