/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "shared/Button/Button";
import styles from "./Board.module.scss";
import { useContext, useEffect, useState } from "react";
import Cell from "shared/Cell/Cell";
import { Mark } from "utils/types/Mark";
import { Winner } from "utils/types/Winner";
import GameContext from "providers/GameProvider/GameContext";

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

const calculateWinner = (cellValue: Mark[]): Mark => {
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

// const nextComputerStep = (computerMark: Mark, cellsValue: Mark[]) => {
//   const playerMark: Mark =  computerMark === "x" ? "o" : "x"
//   lines.forEach((line) => {
//     // eslint-disable-next-line no-console
//     console.log(line)
//     if (line.)
//   })
// }

const Board = () => {
  const { options } = useContext(GameContext);
  const [cells, setCells] = useState<Mark[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Mark>("x");
  const [winner, setWinner] = useState<Winner>(null);

  const setCellValue = (index: number) => {
    setCells((prev) =>
      prev.map((cell, i) => (index === i ? currentPlayer : cell))
    );
    setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
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

  useEffect(() => {
    if (options.game === "cpu") {
      const computerMark: Mark = options.mark === "x" ? "o" : "x";
      if (computerMark === currentPlayer) {
        if (computerMark === "x" && !cells.filter(Boolean).length) {
          const firstStepIndex = Math.floor(Math.random() * 9);
          setCellValue(firstStepIndex);
        }
        // nextComputerStep(computerMark, cells)
      }
      
    }
  }, [currentPlayer]);

  return (
    <>
      <div className={styles.result}>
        {" "}
        {/* МОЖНО ЛИ ТАК ПИСАТЬ ТЕРНАРНИКИ ИЛИ ТАКУЮ ЛОГИКУ НУЖНО ВЫНОСИТЬ В ОТДЛЕЛЬНЫЕ ФУНКЦИИ ИЛИ ЛИТЕРАЛЬНЫЙ ОБЪЕКТ */}
        {winner
          ? winner === "draw"
            ? "Ничья"
            : `Победили ${winner.toUpperCase()}`
          : ""}
      </div>

      <div className={styles.grid}>
        {cells.map((cell, i) => {
          return (
            <Cell
              winner={winner}
              key={i}
              setCellValue={() => setCellValue(i)}
              value={cell}
            />
          );
        })}
      </div>
      <Button onClick={reset} className={styles.btn}>
        Сбросить
      </Button>
    </>
  );
};

export default Board;
