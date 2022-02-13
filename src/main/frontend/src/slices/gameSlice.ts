import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { Player, PlayerInfo, playerMock } from "models/player";

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
  players: [...playerMock],
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
      return { ...state, currentPlayer: 0 };
    },
    advanceAllPlayersByOne: (state) => {
      const players: Player[] = [];
      for (const player of state.players) {
        players.push({...player, position: player.position < 39 ? player.position + 1 : 0});
      }
      return { ...state, players: players };
    },
    removeLastPlayer: (state) => {
      const players = [...state.players];
      players.pop();
      return { ...state, players };
    },
    addPlayer: (state) => {
      const players = [...state.players];
      if (players.length < 8) {
        players.push({...playerMock[players.length], position: players[0].position});
      }
      return { ...state, players };
    },
    resetPlayerMock: (state) => {
      return { ...state, players: playerMock}
    }
  },
});

export const { startGame, nextPlayer, advanceAllPlayersByOne, removeLastPlayer, addPlayer, resetPlayerMock } = gameSlice.actions;

export default gameSlice.reducer;