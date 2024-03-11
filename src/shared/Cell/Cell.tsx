import Button, { ThemeButton } from "shared/Button/Button";
import { Mark } from "utils/types/Mark";
import { Winner } from "utils/types/Winner";

interface CellProps {
  value: Mark;
  winner: Winner;
  setCellValue: () => void;
}

const Cell = ({ value, winner, setCellValue }: CellProps) => {
  return (
    <>
      {value ? (
        <Button theme={ThemeButton.CELL} disabled>
          {value.toUpperCase()}
        </Button>
      ) : (
        <Button
          theme={ThemeButton.CELL}
          onClick={setCellValue}
          disabled={Boolean(winner)}
        />
      )}
    </>
  );
};

export default Cell;
