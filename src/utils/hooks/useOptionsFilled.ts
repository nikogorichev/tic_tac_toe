import GameContext from "providers/GameProvider/GameContext";
import { useContext } from "react";

export const useOptionsFilled = () => {
  const { options } = useContext(GameContext);
  return Object.values(options).every(Boolean);
};
