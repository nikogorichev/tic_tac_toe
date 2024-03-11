import Button, { ThemeButton } from "shared/Button/Button";
import styles from "./Menu.module.scss";
import { useContext } from "react";
import GameContext from "providers/GameProvider/GameContext";
import { Game } from "utils/types/Game";
import { Mark } from "utils/types/Mark";

const Menu = () => {
  const { options, setOptions } = useContext(GameContext);

  const handleSetMark = (mark: Mark) => {
    return () => {
      setOptions({ ...options, mark });
    };
  };
  const handleSetGame = (game: Game) => {
    return () => {
      setOptions({ ...options, game });
    };
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.selectionMenu}>
        <p>Выберите, чем будет играть первый игрок</p>
        <div className={styles.buttons}>
          <Button
            theme={ThemeButton.GREY}
            onClick={handleSetMark("x")}
            selected={options.mark ==="x"}
          >
            X
          </Button>
          <Button
            theme={ThemeButton.GREY}
            onClick={handleSetMark("o")}
            selected={options.mark === "o"}
          >
            0
          </Button>
        </div>
        <p>Помните, что Х ходит первым</p>
      </div>
      <Button onClick={handleSetGame("cpu")} selected={options.game === "cpu"}>
        Новая игра против компьютера
      </Button>
      <Button
        theme={ThemeButton.SECONDARY}
        onClick={handleSetGame("pvp")}
        selected={options.game === "pvp"}
      >
        Новая игра против другого игрока
      </Button>
    </div>
  );
};

export default Menu;
