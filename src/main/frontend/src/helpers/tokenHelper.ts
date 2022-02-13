import { Coordinates } from "./boardSpaceHelper";
import { Player } from "models/player";
import bootTokenImg from "assets/tokens/250x250/boot.png";
import carTokenImg from "assets/tokens/250x250/car.png";
import catTokenImg from "assets/tokens/250x250/cat.png";
import { current } from "@reduxjs/toolkit";
import dogTokenImg from "assets/tokens/250x250/dog.png";
import duckTokenImg from "assets/tokens/250x250/duck.png";
import hatTokenImg from "assets/tokens/250x250/hat.png";
import ironTokenImg from "assets/tokens/250x250/iron.png";
import penguinTokenImg from "assets/tokens/250x250/penguin.png";
import shipTokenImg from "assets/tokens/250x250/ship.png";
import tRexTokenImg from "assets/tokens/250x250/t_rex.png";
import thimbleTokenImg from "assets/tokens/250x250/thimble.png";

export enum Token {
  BOOT = "boot",
  CAR = "car",
  DOG = "dog",
  HAT = "hat",
  IRON = "iron",
  SHIP = "ship",
  THIMBLE = "thimble",
  CAT = "cat",
  DUCK = "duck",
  PENGUIN = "penguin",
  T_REX = "t-rex",
}

export const tokenImages = new Map([
  [Token.BOOT, bootTokenImg],
  [Token.CAR, carTokenImg],
  [Token.CAT, catTokenImg],
  [Token.DOG, dogTokenImg],
  [Token.DUCK, duckTokenImg],
  [Token.HAT, hatTokenImg],
  [Token.IRON, ironTokenImg],
  [Token.PENGUIN, penguinTokenImg],
  [Token.SHIP, shipTokenImg],
  [Token.THIMBLE, thimbleTokenImg],
  [Token.T_REX, tRexTokenImg],
]);

export const centerCoordinates = (coordinates: Coordinates, tokenSize: number) => {
  return {...coordinates, x1: coordinates.x1 + (coordinates.x2 - coordinates.x1 - tokenSize) / 2, y1: coordinates.y1 + (coordinates.y2 - coordinates.y1 - tokenSize) / 2};
}

const STREET_OFFSET = 0.015;

export const getTokenOffset = (currentPlayer: Player, players: Player[]): TokenOffset => {
  let playersOnSpace:Player[] = [];
  for (let player of players) {
    if (player.position === currentPlayer.position) {
      playersOnSpace.push(player)
    }
  }
  // console.log(playersOnSpace);
  if (currentPlayer.position === 10) {
    return jailOffsets[playersOnSpace.length - 1][playersOnSpace.indexOf(currentPlayer)];
  }
  if (currentPlayer.position % 10 === 0) {
    return cornerOffsets[playersOnSpace.length - 1][playersOnSpace.indexOf(currentPlayer)];
  } 
  if (currentPlayer.position < 10 || (currentPlayer.position > 20 && currentPlayer.position < 30)) {
    if (players.length <= 6) {
      const offsets = northSouthOffsets[playersOnSpace.length - 1][playersOnSpace.indexOf(currentPlayer)];
      return {...offsets, y: currentPlayer.position < 10 ? offsets.y + STREET_OFFSET : offsets.y - STREET_OFFSET};
    }
    return northSouthOffsets[playersOnSpace.length - 1][playersOnSpace.indexOf(currentPlayer)];
  }
  if (currentPlayer.position < 20 || currentPlayer.position > 30) {
    if (players.length <= 6) {
      const offsets = eastWestOffsets[playersOnSpace.length - 1][playersOnSpace.indexOf(currentPlayer)];
      return {...offsets, x: currentPlayer.position < 20 ? offsets.x - STREET_OFFSET : offsets.x + STREET_OFFSET};
    }    
    return eastWestOffsets[playersOnSpace.length - 1][playersOnSpace.indexOf(currentPlayer)];
  }
  return {x: 0, y: 0};
}

const JAIL_LEFT = -0.049;
const JAIL_BOTTOM = 0.047;
const JAIL_H_NUDGE = 0.019;
const JAIL_V_NUDGE = 0.019;
const JAIL_PACKED_5 = 0.048;
const JAIL_PACKED_7 = 0.035;
const JAIL_PACKED_8 = 0.03;

const jailOffsets: Array<Array<TokenOffset>> = [
  [{x: JAIL_H_NUDGE, y: JAIL_BOTTOM}],
  [{x: JAIL_H_NUDGE, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: -JAIL_V_NUDGE}],
  [{x: 2*JAIL_H_NUDGE, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: -JAIL_V_NUDGE}, {x: -JAIL_H_NUDGE, y: JAIL_BOTTOM}],
  [{x: 2*JAIL_H_NUDGE, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: -2*JAIL_V_NUDGE}, {x: -0.5*JAIL_H_NUDGE, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: 0.5*JAIL_V_NUDGE}],
  [{x: JAIL_LEFT + 2*JAIL_PACKED_5, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: JAIL_BOTTOM - 2*JAIL_PACKED_5}, {x: JAIL_LEFT + JAIL_PACKED_5, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: JAIL_BOTTOM - JAIL_PACKED_5}, {x: JAIL_LEFT, y: JAIL_BOTTOM}],
  [{x: JAIL_LEFT + 3*JAIL_PACKED_7, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: JAIL_BOTTOM - 2*JAIL_PACKED_5}, {x: JAIL_LEFT + 2*JAIL_PACKED_7, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: JAIL_BOTTOM - JAIL_PACKED_5}, {x: JAIL_LEFT + JAIL_PACKED_7, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: JAIL_BOTTOM}],
  [{x: JAIL_LEFT + 3*JAIL_PACKED_7, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: JAIL_BOTTOM - 3*JAIL_PACKED_7}, {x: JAIL_LEFT + 2*JAIL_PACKED_7, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: JAIL_BOTTOM - 2*JAIL_PACKED_7}, {x: JAIL_LEFT + JAIL_PACKED_7, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: JAIL_BOTTOM - JAIL_PACKED_7}, {x: JAIL_LEFT, y: JAIL_BOTTOM}],
  [{x: JAIL_LEFT + 3*JAIL_PACKED_7, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: JAIL_BOTTOM - 3*JAIL_PACKED_7}, {x: JAIL_LEFT + 2*JAIL_PACKED_7, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: JAIL_BOTTOM - 2*JAIL_PACKED_7}, {x: JAIL_LEFT + JAIL_PACKED_7, y: JAIL_BOTTOM}, {x: JAIL_LEFT, y: JAIL_BOTTOM - JAIL_PACKED_7}, {x: JAIL_LEFT, y: JAIL_BOTTOM}, {x: JAIL_LEFT + JAIL_PACKED_8, y: JAIL_BOTTOM - JAIL_PACKED_8}],
]

const CORNER_H_NUDGE = 0.019;
const CORNER_V_NUDGE = 0.01667;

const cornerOffsets: Array<Array<TokenOffset>> = [
  [{x: 0, y: 0}],
  [{x: -CORNER_H_NUDGE, y: 0}, {x: CORNER_H_NUDGE, y: 0}],
  [{x: -CORNER_H_NUDGE, y: -CORNER_V_NUDGE}, {x: CORNER_H_NUDGE, y: -CORNER_V_NUDGE}, {x: 0, y: CORNER_V_NUDGE}],
  [{x: -CORNER_H_NUDGE, y: -CORNER_V_NUDGE}, {x: CORNER_H_NUDGE, y: -CORNER_V_NUDGE}, {x: -CORNER_H_NUDGE, y: CORNER_V_NUDGE}, {x: CORNER_H_NUDGE, y: CORNER_V_NUDGE}],
  [{x: -2*CORNER_H_NUDGE, y: -CORNER_V_NUDGE}, {x: 0, y: -CORNER_V_NUDGE}, {x: 2*CORNER_H_NUDGE, y: -CORNER_V_NUDGE}, {x: -CORNER_H_NUDGE, y: CORNER_V_NUDGE}, {x: CORNER_V_NUDGE, y: CORNER_V_NUDGE}],
  [{x: -2*CORNER_H_NUDGE, y: -CORNER_V_NUDGE}, {x: 0, y: -CORNER_V_NUDGE}, {x: 2*CORNER_H_NUDGE, y: -CORNER_V_NUDGE}, {x: -2*CORNER_H_NUDGE, y: CORNER_V_NUDGE}, {x: 0, y: CORNER_V_NUDGE}, {x: 2*CORNER_H_NUDGE, y: CORNER_V_NUDGE}],
  [{x: -CORNER_H_NUDGE, y: -2*CORNER_V_NUDGE}, {x: CORNER_H_NUDGE, y: -2*CORNER_V_NUDGE}, {x: -2*CORNER_H_NUDGE, y: 0}, {x: 0, y: 0}, {x: 2*CORNER_H_NUDGE, y: 0}, {x: -CORNER_H_NUDGE, y: 2*CORNER_V_NUDGE}, {x: CORNER_H_NUDGE, y: 2*CORNER_V_NUDGE}],
  [{x: -2*CORNER_H_NUDGE, y: -2*CORNER_V_NUDGE}, {x: 0, y: -2*CORNER_V_NUDGE}, {x: 2*CORNER_H_NUDGE, y: -2*CORNER_V_NUDGE}, {x: -2*CORNER_H_NUDGE, y: 0}, {x: 0, y: 0}, {x: 2*CORNER_H_NUDGE, y: 0}, {x: -CORNER_H_NUDGE, y: 2*CORNER_V_NUDGE}, {x: CORNER_H_NUDGE, y: 2*CORNER_V_NUDGE}],
]


const NS_H_NUDGE = 0.019;
const NS_V_NUDGE = 0.01667;

const northSouthOffsets: Array<Array<TokenOffset>> = [
  [{x: 0, y: 0}],
  [{x: -NS_H_NUDGE, y: 0}, {x: NS_H_NUDGE, y: 0}],
  [{x: -NS_H_NUDGE, y: -NS_V_NUDGE}, {x: NS_H_NUDGE, y: -NS_V_NUDGE}, {x: 0, y: NS_V_NUDGE}],
  [{x: -NS_H_NUDGE, y: -NS_V_NUDGE}, {x: NS_H_NUDGE, y: -NS_V_NUDGE}, {x: -NS_H_NUDGE, y: NS_V_NUDGE}, {x: NS_H_NUDGE, y: NS_V_NUDGE}],
  [{x: -NS_H_NUDGE, y: -2*NS_V_NUDGE}, {x: NS_H_NUDGE, y: -2*NS_V_NUDGE}, {x: -NS_H_NUDGE, y: 0}, {x: NS_H_NUDGE, y: 0}, {x: 0, y: 2*NS_V_NUDGE}],
  [{x: -NS_H_NUDGE, y: -2*NS_V_NUDGE}, {x: NS_H_NUDGE, y: -2*NS_V_NUDGE}, {x: -NS_H_NUDGE, y: 0}, {x: NS_H_NUDGE, y: 0}, {x: -NS_H_NUDGE, y: 2*NS_V_NUDGE}, {x: NS_H_NUDGE, y: 2*NS_V_NUDGE}],
  [{x: -NS_H_NUDGE, y: -3*NS_V_NUDGE}, {x: NS_H_NUDGE, y: -3*NS_V_NUDGE}, {x: -NS_H_NUDGE, y: -NS_V_NUDGE}, {x: NS_H_NUDGE, y: -NS_V_NUDGE}, {x: -NS_H_NUDGE, y: NS_V_NUDGE}, {x: NS_H_NUDGE, y: NS_V_NUDGE}, {x: 0, y: 3*NS_V_NUDGE}],
  [{x: -NS_H_NUDGE, y: -3*NS_V_NUDGE}, {x: NS_H_NUDGE, y: -3*NS_V_NUDGE}, {x: -NS_H_NUDGE, y: -NS_V_NUDGE}, {x: NS_H_NUDGE, y: -NS_V_NUDGE}, {x: -NS_H_NUDGE, y: NS_V_NUDGE}, {x: NS_H_NUDGE, y: NS_V_NUDGE}, {x: -NS_H_NUDGE, y: 3*NS_V_NUDGE}, {x: NS_H_NUDGE, y: 3*NS_V_NUDGE}],
]

const EW_H_NUDGE = 0.01667;
const EW_V_NUDGE = 0.019;

const eastWestOffsets: Array<Array<TokenOffset>> = [
  [{x: 0, y: 0}],
  [{x: -EW_H_NUDGE, y: 0}, {x: EW_H_NUDGE, y: 0}],
  [{x: -EW_H_NUDGE, y: -EW_V_NUDGE}, {x: EW_H_NUDGE, y: -EW_V_NUDGE}, {x: 0, y: EW_V_NUDGE}],
  [{x: -EW_H_NUDGE, y: -EW_V_NUDGE}, {x: EW_H_NUDGE, y: -EW_V_NUDGE}, {x: -EW_H_NUDGE, y: EW_V_NUDGE}, {x: EW_H_NUDGE, y: EW_V_NUDGE}],
  [{x: -2*EW_H_NUDGE, y: -EW_V_NUDGE}, {x: 0, y: -EW_V_NUDGE}, {x: 2*EW_H_NUDGE, y: -EW_V_NUDGE}, {x: -EW_H_NUDGE, y: EW_V_NUDGE}, {x: EW_V_NUDGE, y: EW_V_NUDGE}],
  [{x: -2*EW_H_NUDGE, y: -EW_V_NUDGE}, {x: 0, y: -EW_V_NUDGE}, {x: 2*EW_H_NUDGE, y: -EW_V_NUDGE}, {x: -2*EW_H_NUDGE, y: EW_V_NUDGE}, {x: 0, y: EW_V_NUDGE}, {x: 2*EW_H_NUDGE, y: EW_V_NUDGE}],
  [{x: -3*EW_H_NUDGE, y: -EW_V_NUDGE}, {x: -EW_H_NUDGE, y: -EW_V_NUDGE}, {x: EW_H_NUDGE, y: -EW_V_NUDGE}, {x: 3*EW_H_NUDGE, y: -EW_V_NUDGE}, {x: -2*EW_H_NUDGE, y: EW_V_NUDGE}, {x: 0, y: EW_V_NUDGE}, {x: 2*EW_H_NUDGE, y: EW_V_NUDGE}],
  [{x: -3*EW_H_NUDGE, y: -EW_V_NUDGE}, {x: -EW_H_NUDGE, y: -EW_V_NUDGE}, {x: EW_H_NUDGE, y: -EW_V_NUDGE}, {x: 3*EW_H_NUDGE, y: -EW_V_NUDGE}, {x: -3*EW_H_NUDGE, y: EW_V_NUDGE}, {x: -EW_H_NUDGE, y: EW_V_NUDGE}, {x: EW_H_NUDGE, y: EW_V_NUDGE}, {x: 3*EW_H_NUDGE, y: EW_V_NUDGE}],
]

export interface TokenOffset {
  x: number;
  y: number;
}