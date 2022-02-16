import { UiAction, UiActionType } from "models/uiAction";
import { UiRequest, UiRequestType } from "models/uiRequest";

import { Dispatch } from "react";
import { GameInfo } from "models/game";
import { PlayerInfo } from "models/player";
import axios from "axios";
import { startGame } from "slices/gameSlice";

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
    const rollRequest: UiRequest = {gameId, type: UiRequestType.ROLL, params: []};
    return await axios.post<UiAction[]>(baseUrl, rollRequest).then(
      (response) => {
        const actions: UiAction[] = response.data;
        if (actions.length < 1 || actions[0].type !== UiActionType.DICE_ROLL) {
          return [-1, -1];
        }
        return [actions[0].params[0], actions[0].params[1]];
      }
    )
  }
}
