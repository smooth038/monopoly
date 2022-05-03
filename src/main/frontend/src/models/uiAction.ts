export interface UiAction {
  type: UiActionType,
  params: number[],
}

export enum UiActionType {
  GAME_START = "GAME_START",
  NEXT_PLAYER = "NEXT_PLAYER",
  DICE_ROLL = "DICE_ROLL",
  ADVANCE = "ADVANCE",
  JAIL_IN = "JAIL_IN",
  JAIL_OUT = "JAIL_OUT",
  CARD = "CARD",
  PAY_TO = "PAY_TO",
  TAX = "TAX",
  COLLECT = "COLLECT",
  GET_GOJF = "GET_GOJF",
  USE_GOJF = "USE_GOJF",
  UPGRADE = "UPGRADE",
  DOWNGRADE = "DOWNGRADE",
  MORTGAGE = "MORTGAGE",
  UNMORTGAGE = "UNMORTGAGE",
  BUY = "BUY",
  LOSE = "LOSE"
}