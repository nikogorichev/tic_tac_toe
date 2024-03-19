import Button, { ThemeButton } from "shared/Button/Button";
import styles from "./Menu.module.scss";
import { useContext } from "react";
import GameContext from "providers/GameProvider/GameContext";
import { Game } from "utils/types/Game";
import { Mark } from "utils/types/Mark";

const Menu = () => {
  const { options, setOptions } = useContext(GameContext);

  const handleSetMark = (mark: Mark) => {
    setOptions({ ...options, mark });
  };

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.selectionMenu}>
        <p>Выберите, чем будете играть</p>
        <div className={styles.buttons}>
          <Button
            theme={ThemeButton.GREY}
            onClick={() => handleSetMark("x")}
            selected={options.mark === "x"}
          >
            X
          </Button>
          <Button
            theme={ThemeButton.GREY}
            onClick={() => handleSetMark("o")}
            selected={options.mark === "o"}
          >
            0
          </Button>
        </div>

        <p>Выберите, кто будет делать первый ход</p>
        <div className={styles.buttons}>
          <Button
            theme={ThemeButton.GREY}
            onClick={() => handleSetFirstMove("x")}
            selected={options.firstMove === "x"}
          >
            X
          </Button>
          <Button
            theme={ThemeButton.GREY}
            onClick={() => handleSetFirstMove("o")}
            selected={options.firstMove === "o"}
          >
            0
          </Button>
        </div>
        <Button onClick={handleRandom}>Случайный выбор</Button>
      </div>

      <Button
        onClick={() => handleSetGame("cpu")}
        selected={options.game === "cpu"}
      >
        Новая игра против компьютера
      </Button>
      <Button
        theme={ThemeButton.SECONDARY}
        onClick={() => handleSetGame({ x: "player", o: "player" })}
        selected={options.x === "player" && options.o === "player"}
      >
        Новая игра против другого игрока
      </Button>
      <Button
        theme={ThemeButton.GREY}
        onClick={() => handleSetGame({ x: "cpu", o: "cpu" })}
        selected={options.x === "cpu" && options.o === "cpu"}
      >
        Компьютер против компьютера
      </Button>
    </div>
  );
};

export default Menu;
