import { GameInfo, GameStep } from "models/game";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player, playerMock } from "models/player";

export interface GameState {
  gameId: number,
  gameStep: GameStep,
  currentPlayer: number,
  players: Player[],
  buildings: {space: number, count: number}[],
  gameLock: boolean,
};

const initialState: GameState = {
  gameId: 0,
  gameStep: 'TURN_BEGIN', 
  gameLock: false,
  currentPlayer: 0,
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
          jailTurnsRemaining: 0,
          gojfCards: 0,
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
    nextPlayer: (state) => {
      const numberOfPlayers = state.players.length;
      return { ...state, gameStep: 'TURN_BEGIN', currentPlayer: (state.currentPlayer + 1) % numberOfPlayers};
    },
    advanceCurrentPlayer: (state, reverse: PayloadAction<Boolean>) => {
      const player = {...state.players[state.currentPlayer]};
      player.position = (reverse.payload ? player.position - 1 : player.position + 1) % 40;
      const players = [...state.players];
      players[state.currentPlayer] = player;
      return { ...state, players};
    },
    payTax: (state, amount: PayloadAction<number>) => {
      const player = {...state.players[state.currentPlayer]};
      // for now, we don't keep the jackpot total value in the UI
      player.cash -= amount.payload;
      const players = [...state.players];
      players[state.currentPlayer] = player;
      return { ...state, players};   
    },
    setGameLock: (state, action: PayloadAction<boolean>) => {
      return {...state, gameLock: action.payload};
    },
    sendPlayerToJail: (state) => {
      const player = {...state.players[state.currentPlayer]};
      player.position = 10;
      player.isInJail = true;
      player.jailTurnsRemaining = 3;
      const players = [...state.players];
      players[state.currentPlayer] = player;
      return { ...state, players};
    },
    freePlayerFromJail: (state) => {
      const player = {...state.players[state.currentPlayer]};
      player.isInJail = false;
      player.jailTurnsRemaining = 0;
      const players = [...state.players];
      players[state.currentPlayer] = player;
      return { ...state, players};
    },
    decrementJailTurns: (state) => {
      const player = {...state.players[state.currentPlayer]};
      player.jailTurnsRemaining -= 1;
      const players = [...state.players];
      players[state.currentPlayer] = player;
      return { ...state, players}; 
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
    },
    allPlayersToJail: (state) => {
      const players : Player[] = [];      
      for (const player of state.players) {
        players.push({...player, isInJail: true, position: 10 });
      }
      return { ...state, players };
    }
  },
});

export const { 
  startGame, 
  setGameStep, 
  nextPlayer, 
  advanceCurrentPlayer, 
  payTax,
  setGameLock,
  sendPlayerToJail, 
  freePlayerFromJail, 
  decrementJailTurns,
  advanceAllPlayersByOne, 
  removeLastPlayer, 
  addPlayer, 
  resetPlayerMock, 
  allPlayersToJail
} = gameSlice.actions;

export default gameSlice.reducer;