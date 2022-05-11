import { PlayerInfo } from './player';
import { UiAction } from './uiAction';

export type GameStep =
	| 'NO_GAME'
	| 'TURN_BEGIN'
	| 'RE_ROLL'
	| 'TURN_END'
	| 'BUY_OR_AUCTION'
	| 'AUCTION'
	| 'DEBT'
	| 'BANKRUPTCY'
	| 'GAME_END';

export interface GameInfo {
	gameId: number;
	players: PlayerInfo[];
}

export interface GameResponse {
	gameStep: GameStep;
	actions: UiAction[];
}
