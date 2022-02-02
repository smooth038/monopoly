import bootTokenImg from "assets/tokens/250x250/boot.png";
import carTokenImg from "assets/tokens/250x250/car.png";
import catTokenImg from "assets/tokens/250x250/cat.png";
import dogTokenImg from "assets/tokens/250x250/dog.png";
import duckTokenImg from "assets/tokens/250x250/duck.png";
import hatTokenImg from "assets/tokens/250x250/hat.png";
import ironTokenImg from "assets/tokens/250x250/iron.png";
import penguinTokenImg from "assets/tokens/250x250/penguin.png";
import shipTokenImg from "assets/tokens/250x250/ship.png";
import thimbleTokenImg from "assets/tokens/250x250/thimble.png";
import tRexTokenImg from "assets/tokens/250x250/t_rex.png";

export enum Token {
  BOOT = "boot",
  CAR = "car",
  CAT = "cat",
  DOG = "dog",
  DUCK = "duck",
  HAT = "hat",
  IRON = "iron",
  PENGUIN = "penguin",
  SHIP = "ship",
  THIMBLE = "thimble",
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