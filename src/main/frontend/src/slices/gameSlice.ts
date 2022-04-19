import { GameInfo, GameStep } from "models/game";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Player } from "models/player";

export interface GameState {
  gameId: number,
  gameStep: GameStep,
  currentPlayer: number,
  hasRolled: boolean,
  players: Player[]
  buildings: {space: number, count: number}[],
};

const initialState: GameState = {
  gameId: 0,
  gameStep: 'TURN_BEGIN', 
  currentPlayer: 0,
  hasRolled: false,
  players: [],
  buildings: [], 
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<GameInfo>) => {
      const gameId = action.payload.gameId;
      const newPlayers: Player[] = [];
      for (const player of action.payload.players) {
        const newPlayer: Player = {
          name: player.name,
          token: player.token,
          position: 0,
          isInJail: false,
          cash: 1500,
        } 
        newPlayers.push(newPlayer);
      }
      return { ...state, gameId, gameStep: 'TURN_BEGIN', players: [...newPlayers] };
    },
    // diceRoll: (state, action: PayloadAction<UiAction[]>) => {
    //   const actionList = action.payload;
    //   if (actionList.length < 2 || actionList[0].type !== UiActionType.DICE_ROLL || actionList[1].type !== UiActionType.DICE_ROLL) {
    //     console.error('Server did not answer with dice roll result!');
    //     return { ...state };
    //   }
    //   const [first, second] = [actionList[0].params[0], actionList[1].params[0]];
    //   return { ...state, }
    // },
    setGameStep: (state, action: PayloadAction<GameStep>) => {
      return { ...state, gameStep: action.payload}
    },
    nextPlayer: (state, action: PayloadAction<number>) => {
      const numberOfPlayers = state.players.length;
      const nextPlayer = (state.currentPlayer + 1) % numberOfPlayers;
      if (action.payload !== nextPlayer) {
        throw new Error('Out of sync: Current player should be ' + action.payload + ' but is ' + nextPlayer + ' on client side.');
      }
      return { ...state, gameStep: 'TURN_BEGIN', currentPlayer: (state.currentPlayer + 1) % numberOfPlayers};
    },
    advanceCurrentPlayer: (state, reverse: PayloadAction<Boolean>) => {
      const player = {...state.players[state.currentPlayer]};
      player.position = (reverse.payload ? player.position - 1 : player.position + 1) % 40;
      const players = [...state.players];
      players[state.currentPlayer] = player;
      return { ...state, players};
    },
    // advanceAllPlayersByOne: (state) => {
    //   const players: Player[] = [];
    //   for (const player of state.players) {
    //     players.push({...player, position: player.position < 39 ? player.position + 1 : 0});
    //   }
    //   return { ...state, players: players };
    // },
    // removeLastPlayer: (state) => {
    //   const players = [...state.players];
    //   players.pop();
    //   return { ...state, players };
    // },
    // addPlayer: (state) => {
    //   const players = [...state.players];
    //   if (players.length < 8) {
    //     players.push({...playerMock[players.length], position: players[0].position});
    //   }
    //   return { ...state, players };
    // },
    // resetPlayerMock: (state) => {
    //   return { ...state, players: playerMock}
    // }
  },
});

export const { startGame, setGameStep, nextPlayer, advanceCurrentPlayer} = gameSlice.actions;

export default gameSlice.reducer;