import { Mark } from "utils/types/Mark";

export const switchPlayer = (player: Mark) => {
    return player === "x" ? "o" : "x";
  };