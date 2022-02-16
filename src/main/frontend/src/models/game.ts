import { PlayerInfo } from "./player";

export enum GameStep {
  NO_GAME,
  GAME_BEGIN,
  TURN_BEGIN,
  RE_ROLL,
  TURN_END,
  BUY_OR_AUCTION,
  AUCTION,
  DEBT,
  BANKRUPTCY,
  GAME_END,
}

export interface GameInfo {
  gameId: number,
  players: PlayerInfo[],
}