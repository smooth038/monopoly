import React, { useState } from "react";
import styled from "styled-components";

export const NewGameModal = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [players, setPlayers] = useState<Array<[string, Tokens]>>();

  enum Tokens {
    BOOT = "Boot",
    CAT = "Cat",
    DUCK = "Duck",
    HAT = "Hat",
    IRON = "Iron",
    PENGUIN = "Penguin",
    SHIP = "Ship",
    THIMBLE = "Thimble",
    T_REX = "T-Rex",
  }

  const handleNumberOfPlayersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    if (inputValue) {
      const intValue = parseInt(inputValue);
      if (intValue < 2) {
        setNumberOfPlayers(2);
      } else if (intValue > 8) {
        setNumberOfPlayers(8);
      } else {
        setNumberOfPlayers(intValue);
      }
    }
  };

  return (
    <StyledNewGameModal>
      <h1>New Game</h1>
      <form>
        <StyledRow>
          <label>
            Number of players:&nbsp;&nbsp;
            <input
              type="number"
              onChange={handleNumberOfPlayersChange}
              value={numberOfPlayers}
            />
          </label>
        </StyledRow>
        {Array.from({ length: numberOfPlayers }).map((player, playerIndex) => (
          <StyledRow>
            <StyledPlayerEntry>
              <StyledInline>
                <StyledPlayerName>
                  <input type="text" />
                </StyledPlayerName>
                <StyledPlayerToken>
                  {Object.entries(Tokens).map((token, tokenIndex) => (
                    <label>
                      {token[1]}
                      <input
                        type="radio"
                        name={"player" + playerIndex + "-token"}
                        value={token[0]}
                      />
                    </label>
                  ))}
                </StyledPlayerToken>
              </StyledInline>
            </StyledPlayerEntry>
          </StyledRow>
        ))}
        <StyledFormButtons>
          <button type="button">Start Game</button>
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
  width: 800px;
  color: white;
  background-image: linear-gradient(-210deg, #fff4, #fff0);

  @keyframes fromLeft {
    0% {
      left: -100vw;
    }
    100% {
      left: 0px;
    }
  }

  animation: fromLeft 0.8s ease 1;
  counter-reset: playerNumber;
`;

const StyledRow = styled.div`
  padding: 10px 0px;
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
`;

const StyledFormButtons = styled.div`
  display: flex;
  justify-content: center;
`;
