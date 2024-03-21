import Button, { ThemeButton } from "shared/Button/Button";
import { Game } from "utils/types/Game";

type GameSelectProps = {
  isStartButtonDisabled: boolean;
  markX: Game;
  markO: Game;
  handleSetGame: (game: { x: Game; o: Game }) => void;
  handleSetOptions: () => void;
};

const GameSelect = ({
  isStartButtonDisabled,
  markX,
  markO,
  handleSetGame,
  handleSetOptions,
}: GameSelectProps) => {
  return (
    <>
      <Button
        theme={ThemeButton.SECONDARY}
        onClick={() => handleSetGame({ x: "player", o: "player" })}
        selected={markX === "player" && markO === "player"}
      >
        Новая игра против другого игрока
      </Button>
      <Button
        onClick={() => handleSetGame({ x: "player", o: "cpu" })}
        selected={markX === "player" && markO === "cpu"}
      >
        Новая игра против компьютера
      </Button>
      <Button
        theme={ThemeButton.ORANGE}
        onClick={() => handleSetGame({ x: "cpu", o: "cpu" })}
        selected={markX === "cpu" && markO === "cpu"}
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
