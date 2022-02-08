import { useDispatch, useSelector } from "react-redux";

import { PlayerList } from "components/PlayerList";
import React from "react";
import { RootState } from "app/store";
import { nextPlayer } from "slices/gameSlice";
import styled from "styled-components";

export interface LeftPanelProps {
  frameHeight: number;
}

export const LeftPanel: React.FC<LeftPanelProps> = (props: LeftPanelProps) => {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  return (
    <StyledLeftPanel frameHeight={props.frameHeight}>
      <PlayerList />
      <button onClick={(event: React.MouseEvent) => dispatch(nextPlayer())}>
        Next player
      </button>
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
`;
