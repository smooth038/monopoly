import { AppDispatch } from 'app/store';
import axios from 'axios';
import { GameInfo, GameResponse } from 'models/game';

import { PlayerInfo } from 'models/player';
import { UiActionType } from 'models/uiAction';
import { UiRequest, UiRequestType } from 'models/uiRequest';
import { NavigateFunction } from 'react-router-dom';
import { addActions } from 'slices/actionsSlice';
import {
	decrementJailTurns,
	nextPlayer,
	setGameStep,
	startGame,
} from 'slices/gameSlice';

const baseUrl = 'http://localhost:8080/api/game';

export const gameService = {
	startNewGame: async function (
		players: PlayerInfo[],
		dispatch: AppDispatch,
		navigate: NavigateFunction
	) {
		// axios.interceptors.request.use(request => {
		//   console.log('Starting Request', JSON.stringify(request, null, 2));
		//   return request;
		// });

		// axios.interceptors.response.use(response => {
		//   console.log('Response:', JSON.stringify(response.data, null, 2));
		//   return response;
		// });
		await axios.post<GameInfo>(baseUrl + '/new', players).then(
			(response) => {
				dispatch(startGame(response.data));
				dispatch(addActions([{ type: UiActionType.GAME_START, params: [] }]));
				navigate('/game');
			},
			(error) => {
				console.error('New Game request did not succeed', error);
			}
		);
	},
	rollDice: async (gameId: number, dispatch: AppDispatch) => {
		// axios.interceptors.request.use(request => {
		//   console.log('Starting Request', JSON.stringify(request, null, 2));
		//   return request;
		// });

		// axios.interceptors.response.use(response => {
		//   console.log('Response:', JSON.stringify(response.data, null, 2));
		//   return response;
		// });
		const rollRequest: UiRequest = {
			gameId,
			type: UiRequestType.ROLL,
			params: [],
		};
		return await axios
			.post<GameResponse>(baseUrl, rollRequest)
			.then((response) => {
				dispatch(setGameStep(response.data.gameStep));
				dispatch(addActions(response.data.actions));
			});
	},
	endTurn: async (gameId: number, dispatch: AppDispatch) => {
		const endTurnRequest: UiRequest = {
			gameId,
			type: UiRequestType.END_TURN,
			params: [],
		};
		return await axios
			.post<GameResponse>(baseUrl, endTurnRequest)
			.then((response) => {
				if (
					response.data.actions.length > 0 &&
					response.data.actions[0].type === UiActionType.NEXT_PLAYER
				) {
					dispatch(nextPlayer());
				} else {
					console.error(response.data.actions);
					throw new Error('Unexpected back end response.\n');
				}
			});
	},
	jailWait: async (gameId: number, dispatch: AppDispatch) => {
		const jailWaitRequest: UiRequest = {
			gameId,
			type: UiRequestType.JAIL_WAIT,
			params: [],
		};
		return await axios
			.post<GameResponse>(baseUrl, jailWaitRequest)
			.then((response) => {
				dispatch(setGameStep(response.data.gameStep));
				dispatch(addActions(response.data.actions));
				dispatch(decrementJailTurns());
			});
	},
	jailPay: async (gameId: number, dispatch: AppDispatch) => {
		const jailPayRequest: UiRequest = {
			gameId,
			type: UiRequestType.JAIL_PAY,
			params: [],
		};
		return await axios
			.post<GameResponse>(baseUrl, jailPayRequest)
			.then((response) => {
				dispatch(setGameStep(response.data.gameStep));
				dispatch(addActions(response.data.actions));
			});
	},
	jailRoll: async (gameId: number, dispatch: AppDispatch) => {
		const jailRollRequest: UiRequest = {
			gameId,
			type: UiRequestType.JAIL_ROLL,
			params: [],
		};
		return await axios
			.post<GameResponse>(baseUrl, jailRollRequest)
			.then((response) => {
				dispatch(setGameStep(response.data.gameStep));
				dispatch(addActions(response.data.actions));
				dispatch(decrementJailTurns());
			});
	},
	buyProperty: async (gameId: number, dispatch: AppDispatch) => {
		const buyPropertyRequest: UiRequest = {
			gameId,
			type: UiRequestType.BUY,
			params: [],
		};
		return await axios
			.post<GameResponse>(baseUrl, buyPropertyRequest)
			.then((response) => {
				dispatch(setGameStep(response.data.gameStep));
				dispatch(addActions(response.data.actions));
			});
	},
	doNotBuyProperty: async (gameId: number, dispatch: AppDispatch) => {
		const doNotBuyPropertyRequest: UiRequest = {
			gameId,
			type: UiRequestType.DO_NOT_BUY,
			params: [],
		};
		return await axios
			.post<GameResponse>(baseUrl, doNotBuyPropertyRequest)
			.then((response) => {
				dispatch(setGameStep(response.data.gameStep));
				dispatch(addActions(response.data.actions));
			});
	},
};
