import Button, { ThemeButton } from "shared/Button/Button";
import styles from "./Board.module.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import Cell from "shared/Cell/Cell";
import { Mark } from "utils/types/Mark";
import { Winner } from "utils/types/Winner";
import GameContext from "providers/GameProvider/GameContext";
import { calculateWinner, minimax, nextComputerMove } from "utils/gameLogic";
import Counter from "components/Counter/Counter";
import { getEmptyCells } from "utils/helpers/getEmptyCells";
import { getRandomIndex } from "utils/helpers/getRandomIndex";
import BoardClass from "utils/Game";

const winnerDict = {
  x: "Победили X",
  o: "Победили O",
  draw: "Ничья",
};

const board = new BoardClass();

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

//   useEffect(() => {
//     const boardWinner = board.getWinner(cells);

//     const declareWinner = (winnerPlayer: Winner) => {
      
//       setWinner(winnerPlayer);
      
//     };

//     if (boardWinner !== null) {
//       declareWinner(boardWinner);
//     }
//   }, [cells, currentPlayer]);

  useEffect(() => {
    const winnerPlayer = board.getWinner(cells)
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

  const move = useCallback((index: number, player: Mark) => {
    if (player !== null) {
      setCells((grid) => {
        const gridCopy = grid.concat();
        gridCopy[index] = player;
        return gridCopy;
      });
    }
  }, []);

  const aiMove = useCallback(() => {
    // Important to pass a copy of the grid here
    const boardCopy = new BoardClass(cells.concat());
    const emptyIndices = board.getEmptySquares(cells);
    // const isEmpty = (value: Mark[]) => {
    //   return getEmptyCells(value).length === 3 ** 2;
    // };

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
      setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
    }
  }, [move, cells, options, level]);

  const humanMove = (index: number) => {
    if (!cells[index] && currentPlayer && options[currentPlayer] === "player") {
      move(index, currentPlayer);
      setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentPlayer !== null && options[currentPlayer] === "cpu" && !winner) {
      timeout = setTimeout(() => {
        aiMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [currentPlayer, aiMove, options]);

  //   const isComputerMove =
  //     currentPlayer && options[currentPlayer] === "cpu" && !winner;

  //   useEffect(() => {
  //     if (isComputerMove) {
  //       if (cells.every((cell) => cell)) {
  //         const firstStepIndex = Math.floor(Math.random() * 9);
  //         setCellValue(firstStepIndex);
  //       }
  //       setTimeout(() => {
  //         nextComputerMove(currentPlayer, cells, setCellValue, level);
  //       }, 500);
  //     }
  //   }, [currentPlayer, winner]);

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
