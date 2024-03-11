import Button from "shared/Button/Button";
import styles from "./Board.module.scss";
import { useEffect, useState } from "react";
import Cell from "shared/Cell/Cell";
import { Mark } from "utils/types/Mark";
import { Winner } from "utils/types/Winner";

const calculateWinner = (cellValue: Mark[]): Mark => {
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
  const [cells, setCells] = useState<Mark[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Mark>("x");
  const [winner, setWinner] = useState<Winner>(null);

  const setCellValue = (index: number) => {
    return () => {
      setCells((prev) =>
        prev.map((cell, i) => (index === i ? currentPlayer : cell))
      );
      setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
    };
  };

  const reset = () => {
    setCells(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer("x");
  };

  useEffect(() => {
    const winnerPlayer = calculateWinner(cells);
    if (winnerPlayer) {
      setWinner(winnerPlayer);
    }

    if (!winnerPlayer && !cells.filter((cell) => !cell).length) {
      setWinner("draw");
    }
  }, [cells]);
  return (
    <>
      <div className={styles.grid}>
        {cells.map((cell, i) => {
          return (
            <Cell
              winner={winner}
              key={i}
              setCellValue={setCellValue(i)}
              value={cell}
            />
          );
        })}
      </div>
      <Button onClick={reset}>Сбросить</Button>
    </>
  );
};

export default Board;
