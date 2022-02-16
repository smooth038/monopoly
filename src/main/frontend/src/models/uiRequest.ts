export interface UiRequest {
  gameId: number,
  type: UiRequestType,
  params: number[],
}

export enum UiRequestType {
  AUCTION,
  BUY,
  DOWNGRADE,
  END_TURN,
  JAIL_GOJF,
  JAIL_ROLL,
  JAIL_PAY,
  JAIL_WAIT,
  ROLL,
  SELL,
  TRADE,
  UNMORTGAGE,
  UPGRADE,
}