import { createContext } from "react";

export enum Mark {
  X = "x",
  O = "0",
}

export enum Game {
  CPU = "cpu",
  PVP = "pvp",
}

export type Options = {
  mark: Mark | null;
  game: Game | null;
};

type GameContextType = {
  options: Options;
  setOptions: (value: Options) => void;
};

export default createContext<GameContextType>({
  options: {
    mark: null,
    game: null,
  },
  setOptions: (value) => value,
});
