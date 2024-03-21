import styles from "./MarkSelect.module.scss";
import { useContext } from "react";
import GameContext from "providers/GameProvider/GameContext";
import Button, { ThemeButton } from "shared/Button/Button";
import { Mark } from "utils/types/Mark";

type MarkSelectProps = {
  playerMark: Mark;
  setPlayerMark: (value: Mark) => void;
  setFirstMove: (value: Mark) => void;
  handleRandom: () => void;
};

const MarkSelect = ({
  playerMark,
  setPlayerMark,
  setFirstMove,
  handleRandom,
}: MarkSelectProps) => {
  const { options } = useContext(GameContext);

  return (
    <div className={styles.selectionMenu}>
      <p>Выберите, чем будете играть</p>
      <div className={styles.buttons}>
        <Button
          theme={ThemeButton.GREY}
          onClick={() => setPlayerMark("x")}
          selected={playerMark === "x"}
        >
          X
        </Button>
        <Button
          theme={ThemeButton.GREY}
          onClick={() => setPlayerMark("o")}
          selected={playerMark === "o"}
        >
          0
        </Button>
      </div>

      <p>Выберите, кто будет делать первый ход</p>
      <div className={styles.buttons}>
        <Button
          theme={ThemeButton.GREY}
          onClick={() => setFirstMove("x")}
          selected={options.firstMove === "x"}
        >
          X
        </Button>
        <Button
          theme={ThemeButton.GREY}
          onClick={() => setFirstMove("o")}
          selected={options.firstMove === "o"}
        >
          0
        </Button>
      </div>
      <Button onClick={handleRandom}>Случайный выбор</Button>
    </div>
  );
};

export default MarkSelect;
