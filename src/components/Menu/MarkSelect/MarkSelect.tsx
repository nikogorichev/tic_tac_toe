import styles from "./MarkSelect.module.scss";
import Button, { ThemeButton } from "shared/Button/Button";
import { Mark } from "utils/types/Mark";

type MarkSelectProps = {
  playerMark: Mark;
  firstMove: Mark;
  setPlayerMark: (value: Mark) => void;
  setFirstMove: (value: Mark) => void;
  handleRandom: () => void;
};

const MarkSelect = ({
  playerMark,
  firstMove,
  setPlayerMark,
  setFirstMove,
  handleRandom,
}: MarkSelectProps) => {
  
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
          selected={firstMove === "x"}
        >
          X
        </Button>
        <Button
          theme={ThemeButton.GREY}
          onClick={() => setFirstMove("o")}
          selected={firstMove === "o"}
        >
          0
        </Button>
      </div>
      <Button onClick={handleRandom}>Случайный выбор</Button>
    </div>
  );
};

export default MarkSelect;
