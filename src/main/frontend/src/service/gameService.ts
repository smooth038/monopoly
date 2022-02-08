import { Dispatch } from "react";
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
    await axios.post<PlayerInfo[]>(baseUrl, players).then(
      (response) => {
        dispatch(startGame(response.data));
      }, (error) => {
        console.error(error);
      }
    )
  },
}
