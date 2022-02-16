import React, { useState } from "react";
import {
  addPlayer,
  advanceAllPlayersByOne,
  nextPlayer,
  removeLastPlayer,
  resetPlayerMock,
} from "slices/gameSlice";
import { useDispatch, useSelector } from "react-redux";

import { Die } from "./Die";
import { PlayerList } from "components/PlayerList";
import { RootState } from "app/store";
import { gameService } from "service/gameService";
import styled from "styled-components";

export interface LeftPanelProps {
  frameHeight: number;
}

export const LeftPanel: React.FC<LeftPanelProps> = (props: LeftPanelProps) => {
  const gameState = useSelector((state: RootState) => state.game);
  const [dieValues, setDieValues] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const dispatch = useDispatch();

  const handleRollDice = () => {
    if (isRolling) {
      return;
    }
    setIsRolling(true);
    gameService.rollDice(gameState.gameId, dispatch).then((response) => {
      console.log(response);
      setDieValues([...response]);
    });
    const waitForRoll = async () =>
      setTimeout(() => {
        setIsRolling(false);
      }, 1000);
    waitForRoll();
  };

  return (
    <StyledLeftPanel frameHeight={props.frameHeight}>
      <PlayerList />
      <div className="buttons">
        <button onClick={(event: React.MouseEvent) => dispatch(nextPlayer())}>
          Next player
        </button>
        <button
          onClick={(event: React.MouseEvent) =>
            dispatch(advanceAllPlayersByOne())
          }
        >
          Advance all players by one
        </button>
        <button
          onClick={(event: React.MouseEvent) => dispatch(removeLastPlayer())}
        >
          Remove one player
        </button>
        <button onClick={(event: React.MouseEvent) => dispatch(addPlayer())}>
          Add one player
        </button>
        <button
          onClick={(event: React.MouseEvent) => dispatch(resetPlayerMock())}
        >
          Reset players
        </button>
        <button onClick={() => setIsRolling(!isRolling)}>
          Toggle die roll
        </button>
      </div>
      <StyledDice onClick={handleRollDice}>
        <Die value={dieValues[0]} rolling={isRolling} dieNumber={1} />
        <Die value={dieValues[1]} rolling={isRolling} dieNumber={2} />
      </StyledDice>
    </StyledLeftPanel>
  );
};

const StyledLeftPanel = styled.div<{ frameHeight: number }>`
  box-sizing: border-box;
  background-color: #2223;
  border: 3px solid #0008;
  border-radius: 10px;
  filter: drop-shadow(3px 2px 2px #000);
  padding: 0px 20px;
  min-width: 400px;
  max-width: 400px;
  height: ${(props) => (0.95 * props.frameHeight).toString() + "px"};
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

  position: relative;
  left: 0;
  animation-name: fromLeft;
  animation-duration: 0.8s;
  animation-timing-function: ease;
  animation-iteration-count: 1;

  .buttons {
    position: absolute;
    top: 500px;
  }
`;

const StyledDice = styled.div`
  display: flex;
  /* border: 1px solid red; */

  justify-content: center;
`;
