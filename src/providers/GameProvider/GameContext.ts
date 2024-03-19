import { Dispatch, createContext } from "react";
import { CounterType } from "utils/types/Counter";
import { Game } from "utils/types/Game";
import { Mark } from "utils/types/Mark";

export type Options = {
  mark: Mark;
  firstMove: Mark;
  x: Game;
  o: Game;
};

type GameContextType = {
  options: Options;
  counter: CounterType;
  setOptions: (value: Options) => void;
  setCounter: Dispatch<React.SetStateAction<CounterType>>;
};

export default createContext<GameContextType>({
  options: {
    mark: null,
    firstMove: null,
    x: null,
    o: null,
  },
  counter: { x: 0, o: 0, draw: 0 },

  setOptions: (value) => value,
  setCounter: (value) => value,
});
