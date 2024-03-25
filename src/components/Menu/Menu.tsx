import styles from "./Menu.module.scss";
import { useContext, useState } from "react";
import GameContext, { Level } from "providers/GameProvider/GameContext";
import { Game } from "utils/types/Game";
import { Mark } from "utils/types/Mark";
import OptionsSelect from "./OptionsSelect/OptionsSelect";
import GameSelect from "./GameSelect/GameSelect";
import LevelSelect from "./LevelSelect/LevelSelect";

const Menu = () => {
  const { options, level, dimension, setOptions, setLevel, setDimension } =
    useContext(GameContext);
  const [playerMark, setPlayerMark] = useState<Mark>("x");

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

  const handleSetLevel = (level: Level) => {
    setLevel(level);
  };

  const isStartButtonDisabled = !Object.values(options)
    .filter((value) => typeof value !== "boolean")
    .every((value) => value);

  return (
    <div className={styles.wrapper}>
      <OptionsSelect
        playerMark={playerMark}
        firstMove={options.firstMove}
        dimension={dimension}
        setPlayerMark={setPlayerMark}
        handleRandom={handleRandom}
        setFirstMove={handleSetFirstMove}
        setDimension={setDimension}
      />

      {options.x === "cpu" || options.o === "cpu" ? (
        <LevelSelect handleSetLevel={handleSetLevel} selectedLevel={level} />
      ) : (
        ""
      )}

      <GameSelect
        handleSetGame={handleSetGame}
        handleSetOptions={handleSetOptions}
        isStartButtonDisabled={isStartButtonDisabled}
        markX={options.x}
        markO={options.o}
      />
    </div>
  );
};

export default Menu;
