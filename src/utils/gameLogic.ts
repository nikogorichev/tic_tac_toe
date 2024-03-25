import BoardState from "./BoardState";
import { switchPlayer } from "./helpers/switchPlayer";
import { Mark } from "./types/Mark";

const multiplierMark = {
  x: 1,
  o: -1,
};

export const minimax = (
  board: BoardState,
  player: Mark
): [number, number | null] => {
  if (player) {
    const multiplier = multiplierMark[player];
    let thisScore: number | null;
    let maxScore = -1;
    let bestMove: number | null = null;
    const winner = board.getWinner();
    if (winner !== null) {
      return [multiplierMark[winner], 0];
    } else {
      for (const cell of board.getEmptySquares()) {
        const copy: BoardState = board.clone();
        copy.makeMove(cell, player);
        thisScore = multiplier * minimax(copy, switchPlayer(player))[0];

        if (thisScore >= maxScore) {
          maxScore = thisScore;
          bestMove = cell;
        }
      }
      return [multiplier * maxScore, bestMove];
    }
  }
  return [0, 0];
};
