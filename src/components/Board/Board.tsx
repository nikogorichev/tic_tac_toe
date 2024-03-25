import Button, { ThemeButton } from "shared/Button/Button";
import styles from "./Board.module.scss";
import { useContext, useEffect, useState } from "react";
import Cell from "shared/Cell/Cell";
import { Mark } from "utils/types/Mark";
import { Winner } from "utils/types/Winner";
import GameContext from "providers/GameProvider/GameContext";
import { minimax } from "utils/gameLogic";
import Counter from "components/Counter/Counter";
import { getRandomIndex } from "utils/helpers/getRandomIndex";
import BoardState from "utils/BoardState";
import { switchPlayer } from "utils/helpers/switchPlayer";

const winnerDict = {
  x: "Победили X",
  o: "Победили O",
  draw: "Ничья",
};

const board = new BoardState();

const Board = () => {
  const { options, counter, level, setOptions, setCounter } =
    useContext(GameContext);
  const [cells, setCells] = useState<Mark[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Mark>(options.firstMove);
  const [winner, setWinner] = useState<Winner>(null);

  const reset = () => {
    setCells(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(options.firstMove);
  };

  const backToMenu = () => {
    setOptions({ x: null, o: null, firstMove: null, isGame: false });
  };

  useEffect(() => {
    const winnerPlayer = board.getWinner(cells);
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
  }, [cells, currentPlayer]);

  const move = (index: number, player: Mark) => {
    if (player !== null) {
      setCells((prev) => prev.map((cell, i) => (index === i ? player : cell)));
    }
  };

  const cpuMove = () => {
    const boardCopy = new BoardState(cells.concat());
    const emptyIndices = board.getEmptySquares(cells);

    let index: number | null;
    switch (level) {
      case "easy":
        do {
          index = getRandomIndex(0, 8);
        } while (!emptyIndices.includes(index));
        break;
      case "medium": {
        const smartMove = !boardCopy.isEmpty(cells) && Math.random() < 0.5;
        if (smartMove) {
          index = minimax(boardCopy, currentPlayer)?.[1];
        } else {
          do {
            index = getRandomIndex(0, 8);
          } while (!emptyIndices.includes(index));
        }
        break;
      }
      case "hard":
      default:
        index = boardCopy.isEmpty(cells)
          ? getRandomIndex(0, 8)
          : minimax(boardCopy, currentPlayer)?.[1];
    }

    if (index !== null && !cells[index]) {
      if (currentPlayer !== null) {
        move(index, currentPlayer);
      }
      setCurrentPlayer((prev) => switchPlayer(prev));
    }
  };

  const humanMove = (index: number) => {
    if (!cells[index] && currentPlayer && options[currentPlayer] === "player") {
      move(index, currentPlayer);
      setCurrentPlayer((prev) => switchPlayer(prev));
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentPlayer !== null && options[currentPlayer] === "cpu" && !winner) {
      timeout = setTimeout(() => {
        cpuMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [currentPlayer, options]);

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
              setCellValue={() => humanMove(i)}
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
