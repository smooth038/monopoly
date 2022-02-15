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

export const playerMock: Player[] = [
  {
    name: "Bobby",
    token: 1,
    position: 3,
    isInJail: false,
    cash: 1500,
  },
  {
    name: "Gina",
    token: 5,
    position: 4,
    isInJail: false,
    cash: 2202,
  },
  {
    name: "Patty",
    token: 2,
    position: 3,
    isInJail: false,
    cash: 1500,
  },
  {
    name: "Geralt of Rivia",
    token: 6,
    position: 2,
    isInJail: false,
    cash: 223,
  },
  {
    name: "Brutus",
    token: 8,
    position: 2,
    isInJail: false,
    cash: 995,
  },
  {
    name: "Carotte",
    token: 0,
    position: 1,
    isInJail: false,
    cash: 5121,
  },
  {
    name: "Bébé requin",
    token: 3,
    position: 2,
    isInJail: false,
    cash: 995,
  },
  {
    name: "Belzébuth",
    token: 4,
    position: 3,
    isInJail: false,
    cash: 5121,
  },
]