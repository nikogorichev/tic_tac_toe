import { useContext } from "react";
import GameContext from "providers/GameProvider/GameContext";
import Button, { ThemeButton } from "shared/Button/Button";
import { Game } from "utils/types/Game";

type GameSelectProps = {
  isStartButtonDisabled: boolean;
  handleSetGame: (game: { x: Game; o: Game }) => void;
  handleSetOptions: () => void;
};

const GameSelect = ({
  isStartButtonDisabled,
  handleSetGame,
  handleSetOptions,
}: GameSelectProps) => {
  const { options } = useContext(GameContext);

  return (
    <>
      <Button
        onClick={() => handleSetGame({ x: "player", o: "cpu" })}
        selected={options.x === "player" && options.o === "cpu"}
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

      <Button onClick={handleSetOptions} disabled={isStartButtonDisabled}>
        Начать игру
      </Button>
    </>
  );
};

export default GameSelect;
