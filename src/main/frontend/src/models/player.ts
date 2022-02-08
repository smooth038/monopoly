export interface Player {
  name: string,
  token: number,
  position: number,
  isInJail: boolean,
  cash: number,
}

export interface PlayerInfo {
  name: string,
  token: number,
}