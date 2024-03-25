import { Dispatch, createContext } from "react";
import { CounterType } from "utils/types/Counter";
import { Game } from "utils/types/Game";
import { Mark } from "utils/types/Mark";

export type Options = {
  firstMove: Mark;
  x: Game;
  o: Game;
  isGame: boolean;
};

// enum или union type?
export enum Level {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

type GameContextType = {
  options: Options;
  counter: CounterType;
  level: Level;
  dimension: number;
  setOptions: Dispatch<React.SetStateAction<Options>>;
  setCounter: Dispatch<React.SetStateAction<CounterType>>;
  setLevel: Dispatch<React.SetStateAction<Level>>;
  setDimension: Dispatch<React.SetStateAction<number>>;
};

export default createContext<GameContextType>({
  options: {
    firstMove: null,
    x: null,
    o: null,
    isGame: false,
  },
  counter: { x: 0, o: 0, draw: 0 },
  level: Level.MEDIUM,
  dimension: 3,
  setOptions: (value) => value,
  setCounter: (value) => value,
  setLevel: (value) => value,
  setDimension: (value) => value,
});
