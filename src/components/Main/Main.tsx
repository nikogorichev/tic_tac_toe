import Board from "components/Board/BoardTest";
import Menu from "components/Menu/Menu";
import { useOptionsFilled } from "utils/hooks/useOptionsFilled";

const Main = () => {
  const isOptionsFilled = useOptionsFilled();

  return !isOptionsFilled ? <Menu /> : <Board />;
};

export default Main;
