import Button, { ThemeButton } from "shared/Button/Button";
import styles from "./Board.module.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import Cell from "shared/Cell/Cell";
import { Mark } from "utils/types/Mark";
import { Winner } from "utils/types/Winner";
import GameContext from "providers/GameProvider/GameContext";
import { calculateWinner, nextComputerMove } from "utils/gameLogic";
import Counter from "components/Counter/Counter";

const winnerDict = {
  x: "Победили X",
  o: "Победили O",
  draw: "Ничья",
};

const Board = () => {
  const { options, counter, level, setOptions, setCounter } =
    useContext(GameContext);
  const [cells, setCells] = useState<Mark[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Mark>(options.firstMove);
  const [winner, setWinner] = useState<Winner>(null);

  console.log(options)

  const setCellValue = (index: number) => {
    setCells((prev) =>
      prev.map((cell, i) => (index === i ? currentPlayer : cell))
    );
    setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
  };

  const reset = () => {
    setCells(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(options.firstMove);
  };

  const backToMenu = () => {
    setOptions({ x: null, o: null, firstMove: null, isGame: false });
  };

  useEffect(() => {
    const winnerPlayer = calculateWinner(cells);
    if (winnerPlayer) {
      setWinner(winnerPlayer);
      setCounter((prev) => ({
        ...prev,
        [winnerPlayer]: prev[winnerPlayer] + 1,
      }));
    }

    if (!winnerPlayer && !cells.filter((cell) => !cell).length) {
      setWinner("draw");
      setCounter((prev) => ({ ...prev, draw: prev.draw + 1 }));
    }
  }, [cells]);

  // const move = useCallback(
  //   (index: number, player: Mark) => {
  //     if (player !== null) {
  //       setGrid((grid) => {
  //         const gridCopy = grid.concat();
  //         gridCopy[index] = player;
  //         return gridCopy;
  //       });
  //     }
  //   },
  //   []
  // );

  const isComputerMove =
    currentPlayer && options[currentPlayer] === "cpu" && !winner;

  useEffect(() => {
    if (isComputerMove) {
      if (cells.every((cell) => cell)) {
        const firstStepIndex = Math.floor(Math.random() * 9);
        setCellValue(firstStepIndex);
      }
      setTimeout(() => {
        nextComputerMove(currentPlayer, cells, setCellValue, level);
      }, 500);
    }
  }, [currentPlayer, winner]);

  return (
    <>
      <div className={styles.result}>{winner && winnerDict[winner]}</div>
      <div className={styles.result}>
        {!winner && `Ход ${currentPlayer && currentPlayer.toUpperCase()}`}
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
      <Counter
        counters={[
          { title: "Крестики", value: counter.x },
          { title: "Ничья", value: counter.draw },
          { title: "Нолики", value: counter.o },
        ]}
      />
    </>
  );
};

export default Board;
