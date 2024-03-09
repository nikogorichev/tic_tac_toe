import Button, { ThemeButton } from "shared/Button/Button";
import styles from "./Menu.module.scss";
import { useContext } from "react";
import GameContext, { Game, Mark } from "providers/GameProvider/GameContext";

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
            onClick={handleSetMark(Mark.X)}
            selected={options.mark === Mark.X}
          >
            X
          </Button>
          <Button
            theme={ThemeButton.GREY}
            onClick={handleSetMark(Mark.O)}
            selected={options.mark === Mark.O}
          >
            0
          </Button>
        </div>
        <p>Помните, что Х ходит первым</p>
      </div>
      <Button
        onClick={handleSetGame(Game.CPU)}
        selected={options.game === Game.CPU}
      >
        Новая игра против компьютера
      </Button>
      <Button
        theme={ThemeButton.SECONDARY}
        onClick={handleSetGame(Game.PVP)}
        selected={options.game === Game.PVP}
      >
        Новая игра против другого игрока
      </Button>
    </div>
  );
};

export default Menu;
