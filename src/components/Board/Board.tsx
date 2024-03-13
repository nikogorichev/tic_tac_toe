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

const Board = () => {
  const { options } = useContext(GameContext);
  const [cells, setCells] = useState<Mark[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Mark>("x");
  const [winner, setWinner] = useState<Winner>(null);

  const findLine = (cellsValue: Mark[]) => {
    return lines.filter((cellIndexes) => {
      const squareValues = cellIndexes.map((index) => cells[index]);
      return (
        JSON.stringify(cellsValue.sort()) ===
        JSON.stringify(squareValues.sort())
      );
    });
  };

  const nextComputerMove = (computerMark: Mark, cellsValue: Mark[]) => {
    const playerMark: Mark = computerMark === "x" ? "o" : "x";
    const winLine = findLine([computerMark, computerMark, null]);
    const blockLine = findLine([playerMark, playerMark, null]);
    const defaultLine = findLine([computerMark, null, null]);

    if (winLine.length > 0) {
      const winIndex = winLine[0].filter(
        (index) => cellsValue[index] === null
      )[0];
      setCellValue(winIndex);
      return;
    }

    if (blockLine.length > 0) {
      const blockIndex = blockLine[0].filter(
        (index) => cellsValue[index] === null
      )[0];
      setCellValue(blockIndex);
      return;
    }

    if (defaultLine.length > 0) {
      const defaultIndex = defaultLine[0].filter(
        (index) => cellsValue[index] === null
      )[0];
      setCellValue(defaultIndex);
      return;
    }

    const emptyIndexes = cellsValue
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null);

    const randomIndex =
      emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];

    randomIndex && setCellValue(randomIndex);
  };

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
      if (computerMark === "x" && cells.every((cell) => cell)) {
        const firstStepIndex = Math.floor(Math.random() * 9);
        setCellValue(firstStepIndex);
      }
      if (computerMark === currentPlayer) {
        setTimeout(() => {
          !winner && nextComputerMove(computerMark, cells);
        }, 300);
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
