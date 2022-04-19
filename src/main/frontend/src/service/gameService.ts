import { GameInfo, GameResponse } from "models/game";
import { UiRequest, UiRequestType } from "models/uiRequest";
import { nextPlayer, setGameStep, startGame } from "slices/gameSlice";

import { Dispatch } from "react";
import { PlayerInfo } from "models/player";
import { UiActionType } from "models/uiAction";
import { addActions } from "slices/actionsSlice";
import axios from "axios";

const baseUrl = 'http://localhost:8080/api/game'

export const gameService = {
  startNewGame: async function(players: PlayerInfo[], dispatch: Dispatch<any>) {
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
      }, (error) => {
        console.error(error);
      }
    )
  },
  rollDice: async (gameId: number, dispatch: Dispatch<any>) => {
    // axios.interceptors.request.use(request => {
    //   console.log('Starting Request', JSON.stringify(request, null, 2));
    //   return request;
    // });
    
    // axios.interceptors.response.use(response => {
    //   console.log('Response:', JSON.stringify(response.data, null, 2));
    //   return response;
    // });    
    const rollRequest: UiRequest = {gameId, type: UiRequestType.ROLL, params: []};
    return await axios.post<GameResponse>(baseUrl, rollRequest).then(
      (response) => {
        dispatch(setGameStep(response.data.gameStep));
        dispatch(addActions(response.data.actions));
      }
    )
  },
  endTurn: async (gameId: number, dispatch: Dispatch<any>) => {
    const endTurnRequest: UiRequest = {gameId, type: UiRequestType.END_TURN, params: []};
    return await axios.post<GameResponse>(baseUrl, endTurnRequest).then(
      (response) => {
        if (response.data.actions.length > 0 && response.data.actions[0].type === UiActionType.NEXT_PLAYER && response.data.actions[0].params.length > 0) {
          dispatch(nextPlayer(response.data.actions[0].params[0]));
        }
        else {
          console.error(response.data.actions);
          throw new Error('Unexpected back end response.\n');
        }
      }
    )}
}
