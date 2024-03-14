import Button, { ThemeButton } from "shared/Button/Button";
import styles from "./Board.module.scss";
import { useContext, useEffect, useState } from "react";
import Cell from "shared/Cell/Cell";
import { Mark } from "utils/types/Mark";
import { Winner } from "utils/types/Winner";
import GameContext from "providers/GameProvider/GameContext";
import { calculateWinner, nextComputerMove } from "utils/gameLogic";

const Board = () => {
  const { options, setOptions } = useContext(GameContext);
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

  const backToMenu = () => {
    setOptions({ mark: null, game: null });
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
    if (options.game === "cpu" && !winner) {
      const computerMark: Mark = options.mark === "x" ? "o" : "x";
      if (computerMark === "x" && cells.every((cell) => cell)) {
        const firstStepIndex = Math.floor(Math.random() * 9);
        setCellValue(firstStepIndex);
      }
      if (computerMark === currentPlayer) {
        nextComputerMove(computerMark, cells, setCellValue);
      }
    }
  }, [currentPlayer, winner]);

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
      <div className={styles.btnContainer}>
        <Button onClick={reset} className={styles.btn}>
          Сбросить
        </Button>
        <Button
          onClick={backToMenu}
          className={styles.btn}
          theme={ThemeButton.SECONDARY}
        >
          В главное меню
        </Button>
      </div>
    </>
  );
};

export default Board;
