import { LevelType } from "utils/types/Level";
import styles from "./LevelSelect.module.scss";
import Button from "shared/Button/Button";

type LevelSelectProps = {
  selectedLevel: LevelType;
  handleSetLevel: (value: LevelType) => void;
};

const LevelSelect = ({ selectedLevel, handleSetLevel }: LevelSelectProps) => {
  return (
    <div className={styles.wrapper}>
      Выберите уровень сложности
      <div className={styles.btnsContainer}>
        <Button
          onClick={() => handleSetLevel("easy")}
          selected={selectedLevel === "easy"}
        >
          Легкий
        </Button>
        <Button
          onClick={() => handleSetLevel("medium")}
          selected={selectedLevel === "medium"}
        >
          Средний
        </Button>
        <Button
          onClick={() => handleSetLevel("hard")}
          selected={selectedLevel === "hard"}
        >
          Тяжелый
        </Button>
      </div>
    </div>
  );
};

export default LevelSelect;
