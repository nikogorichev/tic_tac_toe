import Board from "components/Board/Board";
import Menu from "components/Menu/Menu";
import GameContext from "providers/GameProvider/GameContext";
import { useContext, useEffect, useState } from "react";

const Main = () => {
  const { options } = useContext(GameContext);
  const [isOptionsFilled, setIsOptionsFilled] = useState(false);

  useEffect(() => {
    if (Object.values(options).every(Boolean)) {
      setIsOptionsFilled(true);
    } else {
      setIsOptionsFilled(false);
    }
  }, [options]);

  return !isOptionsFilled ? <Menu /> : <Board />;
};

export default Main;
