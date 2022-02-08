import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { Player, PlayerInfo } from "models/player";

import { GameStep } from "models/game";

export interface GameState {
  gameStep: GameStep,
  currentPlayer: number,
  hasRolled: boolean,
  players: Player[]
  buildings: {space: number, count: number}[],
};

const initialState: GameState = {
  gameStep: GameStep.NO_GAME,
  currentPlayer: 0,
  hasRolled: false,
  players: [],
  buildings: [], 
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<PlayerInfo[]>) => {
      const newPlayers: Player[] = [];
      for (const player of action.payload) {
        const newPlayer: Player = {
          name: player.name,
          token: player.token,
          position: 0,
          isInJail: false,
          cash: 1500,
        } 
        newPlayers.push(newPlayer);
      }
      return { ...state, gameStep: GameStep.GAME_BEGIN, players: [...state.players, ...newPlayers] };
    },
    nextPlayer: (state) => {
      const numberOfPlayers = state.players.length;
      if (state.currentPlayer < numberOfPlayers - 1) {
        return { ...state, currentPlayer: state.currentPlayer + 1};
      }
      return {...state, currentPlayer: 0};
    }
  },
});

export const { startGame, nextPlayer } = gameSlice.actions;

export default gameSlice.reducer;