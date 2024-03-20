import { Dispatch, createContext } from "react";
import { CounterType } from "utils/types/Counter";
import { Game } from "utils/types/Game";
import { Mark } from "utils/types/Mark";

export type Options = {
  firstMove: Mark;
  x: Game;
  o: Game;
  isGame: boolean
};

type GameContextType = {
  options: Options;
  counter: CounterType;
  setOptions: Dispatch<React.SetStateAction<Options>>;
  setCounter: Dispatch<React.SetStateAction<CounterType>>;
};

export default createContext<GameContextType>({
  options: {
    firstMove: null,
    x: null,
    o: null,
    isGame: false
  },
  counter: { x: 0, o: 0, draw: 0 },

  setOptions: (value) => value,
  setCounter: (value) => value,
});
