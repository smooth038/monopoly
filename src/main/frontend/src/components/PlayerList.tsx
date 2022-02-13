import { Token, tokenImages } from "helpers/tokenHelper";

import React from "react";
import { RootState } from "app/store";
import redDice from "assets/red-dice.svg";
import styled from "styled-components";
import { useSelector } from "react-redux";

export const PlayerList: React.FC = () => {
  const players = useSelector((state: RootState) => state.game.players);
  const currentPlayer = useSelector(
    (state: RootState) => state.game.currentPlayer
  );

  return (
    <StyledUnorderedList>
      {players.length > 0 && (
        <StyledDice currentPlayer={currentPlayer}>
          <img src={redDice} alt="dice" />
        </StyledDice>
      )}
      {players.map((player, i) => {
        // console.log(player, i);
        return (
          <StyledListItem key={player.name}>
            <div className="token">
              <img
                src={tokenImages.get(Object.values(Token)[player.token])}
                alt={Object.keys(Token)[player.token]}
              />
            </div>
            <div className="playerName">{player.name}</div>
            <div className="cash">{player.cash.toLocaleString()}$</div>
          </StyledListItem>
        );
      })}
    </StyledUnorderedList>
  );
};

const StyledUnorderedList = styled.ul`
  list-style: none;
  position: relative;
  margin: 1em 0em;
  padding-left: 2em;
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  div.token {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
  }
  div.playerName {
    line-height: 2rem;
    overflow-x: hidden;
    margin-right: 0.25rem;
    white-space: nowrap;
    ::after {
      content: " ..........................................................................................................................................";
      white-space: nowrap;
    }
  }
  img {
    height: 1.5em;
  }
`;

const StyledDice = styled.div<{ currentPlayer: number }>`
  display: flex;
  align-items: center;
  position: absolute;
  top: ${(props) => props.currentPlayer * 2 + "rem"};
  left: -0.5rem;
  height: 2rem;
  img {
    height: 1.5rem;
  }
  transition: top 0.25s ease-out;
`;
