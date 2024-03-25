import { Level } from "providers/GameProvider/GameContext";
import styles from "./LevelSelect.module.scss";
import Button from "shared/Button/Button";

type LevelSelectProps = {
  selectedLevel: Level;
  handleSetLevel: (value: Level) => void;
};

const LevelSelect = ({ selectedLevel, handleSetLevel }: LevelSelectProps) => {
  return (
    <div className={styles.wrapper}>
      Выберите уровень сложности
      <div className={styles.btnsContainer}>
        <Button
          onClick={() => handleSetLevel(Level.EASY)}
          selected={selectedLevel === Level.EASY}
        >
          Легкий
        </Button>
        <Button
          onClick={() => handleSetLevel(Level.MEDIUM)}
          selected={selectedLevel === Level.MEDIUM}
        >
          Средний
        </Button>
        <Button
          onClick={() => handleSetLevel(Level.HARD)}
          selected={selectedLevel === Level.HARD}
        >
          Тяжелый
        </Button>
      </div>
    </div>
  );
};

export default LevelSelect;
