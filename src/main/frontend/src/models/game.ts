import { Player } from "./player";

export interface Game {
  players: Player[],
  
}

export enum GameState {
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