import Board from "components/Board/Board";
import Menu from "components/Menu/Menu";
import { useOptionsFilled } from "utils/hooks/useOptionsFilled";

const Main = () => {
  const isOptionsFilled = useOptionsFilled();

  return isOptionsFilled ? <Board /> : <Menu />;
};

export default Main;
