import { Mark } from "utils/types/Mark";

export const getEmptyCells = (cellsValue: Mark[]) => {
  return cellsValue
    .map((cell, index) => (cell === null ? index : null))
    .filter((val) => val !== null);
};
