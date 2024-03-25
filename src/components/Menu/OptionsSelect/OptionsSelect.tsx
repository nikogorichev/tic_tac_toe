import styles from "./OptionsSelect.module.scss";
import Button, { ThemeButton } from "shared/Button/Button";
import { Mark } from "utils/types/Mark";

type OptionsSelectProps = {
  playerMark: Mark;
  firstMove: Mark;
  dimension: number
  setPlayerMark: (value: Mark) => void;
  setFirstMove: (value: Mark) => void;
  setDimension: (value: number) => void;
  handleRandom: () => void;
};

const OptionsSelect = ({
  playerMark,
  firstMove,
  dimension,
  setPlayerMark,
  setFirstMove,
  setDimension,
  handleRandom,
}: OptionsSelectProps) => {
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

      <p>Выберите размер поля</p>
      <div className={styles.buttons}>
        <Button
          theme={ThemeButton.GREY}
          onClick={() => setDimension(3)}
          selected={dimension === 3}
        >
          3х3
        </Button>
        <Button
          theme={ThemeButton.GREY}
          onClick={() => setDimension(5)}
          selected={dimension === 5}
        >
          5х5
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

export default OptionsSelect;
