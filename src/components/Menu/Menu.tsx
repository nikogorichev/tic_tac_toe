import styles from "./Menu.module.scss";
import { useContext, useState } from "react";
import GameContext from "providers/GameProvider/GameContext";
import { Game } from "utils/types/Game";
import { Mark } from "utils/types/Mark";
import MarkSelect from "./MarkSelect/MarkSelect";
import GameSelect from "./GameSelect/GameSelect";

const Menu = () => {
  const { options, setOptions } = useContext(GameContext);
  const [playerMark, setPlayerMark] = useState<Mark>(null);

  const handleSetFirstMove = (firstMove: Mark) => {
    setOptions({ ...options, firstMove });
  };

  const handleSetGame = (game: { x: Game; o: Game }) => {
    setOptions({ ...options, ...game });
  };

  const handleRandom = () => {
    const marks: [Mark, Mark] = ["x", "o"];
    const randomIndex = Math.floor(Math.random() * 2);
    return handleSetFirstMove(marks[randomIndex]);
  };

  const handleSetOptions = () => {
    const resultMarks = Object.assign({}, options);
    if (options.x === "player" && options.o === "cpu" && playerMark) {
      resultMarks[playerMark] = "player";
      resultMarks[playerMark === "x" ? "o" : "x"] = "cpu";
    }
    setOptions({ ...resultMarks, isGame: true });
  };

  const isStartButtonDisabled = !Object.values(options)
    .filter((value) => typeof value !== "boolean")
    .every((value) => value);

  return (
    <div className={styles.wrapper}>
      <MarkSelect
        playerMark={playerMark}
        setPlayerMark={setPlayerMark}
        handleRandom={handleRandom}
        setFirstMove={handleSetFirstMove}
      />

      <GameSelect
        handleSetGame={handleSetGame}
        handleSetOptions={handleSetOptions}
        isStartButtonDisabled={isStartButtonDisabled}
      />
    </div>
  );
};

export default Menu;
