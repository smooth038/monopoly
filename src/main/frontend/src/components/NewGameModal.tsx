import React, { useRef, useState } from "react";
import styled from "styled-components";
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
import t_rexTokenImg from "assets/tokens/250x250/t_rex.png";

export enum Tokens {
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
  T_REX = "t_rex",
}

const tokenImages = new Map([
  [Tokens.BOOT, bootTokenImg],
  [Tokens.CAR, carTokenImg],
  [Tokens.CAT, catTokenImg],
  [Tokens.DOG, dogTokenImg],
  [Tokens.DUCK, duckTokenImg],
  [Tokens.HAT, hatTokenImg],
  [Tokens.IRON, ironTokenImg],
  [Tokens.PENGUIN, penguinTokenImg],
  [Tokens.SHIP, shipTokenImg],
  [Tokens.THIMBLE, thimbleTokenImg],
  [Tokens.T_REX, t_rexTokenImg],
]);

export const NewGameModal = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [players, setPlayers] = useState<
    Array<{ name: string; token: Tokens }>
  >([
    { name: "", token: Tokens.BOOT },
    { name: "", token: Tokens.CAR },
  ]);

  const handleNumberOfPlayersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    if (inputValue) {
      let newNumberOfPlayers = parseInt(inputValue);
      if (newNumberOfPlayers < 2) {
        newNumberOfPlayers = 2;
      } else if (newNumberOfPlayers > 8) {
        newNumberOfPlayers = 8;
      }
      if (newNumberOfPlayers !== numberOfPlayers) {
        const newPlayers = [...players];
        if (newNumberOfPlayers > numberOfPlayers) {
          const numberOfPlayersToAdd = newNumberOfPlayers - numberOfPlayers;
          for (let i = 1; i <= numberOfPlayersToAdd; i++) {
            newPlayers.push({
              name: "",
              token: Object.values(Tokens)[i + numberOfPlayers],
            });
          }
        } else if (newNumberOfPlayers < numberOfPlayers) {
          const numberOfPlayersToRemove = numberOfPlayers - newNumberOfPlayers;
          for (let i = 1; i <= numberOfPlayersToRemove; i++) {
            newPlayers.pop();
          }
        }
        setPlayers(newPlayers);
        setNumberOfPlayers(newNumberOfPlayers);
      }
    }
  };

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    playerIndex: number
  ) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].name = event.target.value;
    setPlayers(newPlayers);
  };

  const handlePlayerTokenChange = (playerIndex: number, tokenIndex: number) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].token = Object.values(Tokens)[tokenIndex];
    setPlayers(newPlayers);
  };

  const handleNewGameButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    alert(players);
  };

  return (
    <StyledNewGameModal>
      <h1>New Game</h1>
      <form>
        <StyledRow>
          <StyledNumberOfPlayers>
            <label>
              Number of players:&nbsp;&nbsp;
              <input
                type="number"
                onChange={handleNumberOfPlayersChange}
                value={numberOfPlayers}
              />
            </label>
          </StyledNumberOfPlayers>
        </StyledRow>
        {Array.from({ length: numberOfPlayers }).map((player, playerIndex) => (
          <StyledRow key={playerIndex}>
            <StyledPlayerEntry>
              <StyledInline>
                <StyledPlayerName>
                  <input
                    type="text"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handlePlayerNameChange(event, playerIndex)
                    }
                  />
                </StyledPlayerName>
                <StyledPlayerToken>
                  {Object.values(Tokens).map((token, tokenIndex) => (
                    <span
                      key={playerIndex.toString() + "-" + tokenIndex.toString()}
                    >
                      <input
                        type="radio"
                        id={"player" + playerIndex + "-token"}
                        name={"player" + playerIndex + "-token"}
                        value={token}
                        checked={
                          (!players[playerIndex] &&
                            tokenIndex === playerIndex) ||
                          players[playerIndex]?.token === token
                        }
                        readOnly
                      />
                      <label
                        htmlFor={"player" + playerIndex + "-token"}
                        onClick={(
                          event: React.MouseEvent<HTMLLabelElement>
                        ) => {
                          handlePlayerTokenChange(playerIndex, tokenIndex);
                        }}
                      >
                        <img src={tokenImages.get(token)} alt={token} />
                      </label>
                    </span>
                  ))}
                </StyledPlayerToken>
              </StyledInline>
            </StyledPlayerEntry>
          </StyledRow>
        ))}
        <StyledFormButtons>
          <button type="button" onClick={handleNewGameButtonClick}>
            Start Game
          </button>
        </StyledFormButtons>
      </form>
    </StyledNewGameModal>
  );
};

const StyledNewGameModal = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  background-color: #2223;
  border: 3px solid #0008;
  border-radius: 10px;
  filter: drop-shadow(3px 2px 2px #000);
  padding: 10px 20px;
  color: white;
  background-image: linear-gradient(-210deg, #fff4, #fff0);

  @keyframes fromLeft {
    from {
      left: -100vw;
      opacity: 0;
    }
  }

  animation: fromLeft 0.8s ease 1;
  counter-reset: playerNumber;
`;

const StyledRow = styled.div`
  padding: 15px 0px;
`;

const StyledNumberOfPlayers = styled.div`
  input {
    height: 1.5em;
    width: 3em;
  }
`;
const StyledPlayerEntry = styled.div`
  display: flex;
  ::before {
    counter-increment: playerNumber;
    content: counter(playerNumber) ")";
    padding-right: 0.5em;
    display: flex;
    align-items: center;
    font-size: 1.2em;
    font-weight: 600;
  }
`;

const StyledInline = styled.span`
  display: flex;
`;
const StyledPlayerName = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-right: 8px;
  input {
    flex-grow: 1;
    height: 1.5em;
  }
`;

const StyledPlayerToken = styled.div`
  margin-left: 8px;
  white-space: nowrap;
  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  label {
    display: inline-block;
    margin: 0px 2px;
    padding: 0px 3px;
    font-size: 16px;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  input[type="radio"]:checked + label {
    border: 1px solid #4c4;
    box-shadow: 0 0 0.5em 0 #4c4, inset 0 0 0.5em 0 #4c4;
  }
  label:hover {
    background-color: #dfd3;
  }
  img {
    width: 2.5em;
    height: 2.5em;
  }
`;

const StyledFormButtons = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0px;
  button {
    font-size: 18px;
    padding: 8px 32px;
    background-color: transparent;
    border: 2px solid white;
    box-shadow: 0 0 0.5em 0 white, inset 0 0 0.5em 0 white;
    color: white;
    :hover {
      background-color: #dfd3;
    }
    :active {
      background-color: #4c4;
    }
  }
`;
