import {
  Coordinates,
  getSquare,
  selectableSquares,
  spaceCoordinates,
} from "helpers/boardSpaceHelper";
import React, { useState } from "react";

import boardImage from "assets/board-high-res.jpg";
import styled from "styled-components";

export interface BoardProps {
  frameHeight: number;
}

export const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const [highlightVisible, setHighlightVisible] = useState(true);
  const [highlightedSquare, setHighlightedSquare] = useState(1);

  const handleBoardClick = (event: React.MouseEvent) => {
    let targetRect = event.currentTarget.getBoundingClientRect();
    const x = event.pageX - targetRect.left;
    const y = event.pageY - targetRect.top;
    const square = getSquare(x, y, targetRect);
    if (square >= 0) {
      if (square === highlightedSquare) {
        setHighlightVisible(false);
        setHighlightedSquare(-1);
      } else {
        if (selectableSquares.includes(square)) {
          setHighlightedSquare(square);
          setHighlightVisible(true);
        }
      }
    }
  };

  return (
    <StyledBoard frameHeight={props.frameHeight} onClick={handleBoardClick}>
      <div className="lighting" />
      {highlightVisible && (
        <StyledHighlight
          className="highlight"
          coordinates={spaceCoordinates.get(highlightedSquare) as Coordinates}
        />
      )}
    </StyledBoard>
  );
};

const StyledBoard = styled.div<{ frameHeight: number }>`
  --board-size: ${(props) => (0.95 * props.frameHeight).toString() + "px"};
  border: 3px solid black;
  border-radius: 7px;
  text-align: center;
  box-sizing: border-box;
  width: var(--board-size);
  height: var(--board-size);
  margin: 0;
  background-image: url(${boardImage});
  background-size: contain;
  background-repeat: no-repeat;
  filter: drop-shadow(3px 2px 1px black);

  @keyframes fromRight {
    0% {
      left: 100vw;
    }
    100% {
      left: 0px;
    }
  }

  @keyframes rotate {
    to {
      transform: rotateZ(90deg);
    }
  }

  position: relative;
  left: 0px;
  animation-name: fromRight;
  animation-duration: 0.8s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
  /* animation: rotate 1s ease forwards; */

  .lighting {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(-210deg, #fff2, #fff0);
  }
`;

const StyledHighlight = styled.div<{
  coordinates: Coordinates;
}>`
  position: absolute;
  box-sizing: border-box;
  left: ${(props) => props.coordinates.x1 * 100}%;
  width: ${(props) => (props.coordinates.x2 - props.coordinates.x1) * 100}%;
  top: ${(props) => props.coordinates.y1 * 100}%;
  height: ${(props) => (props.coordinates.y2 - props.coordinates.y1) * 100}%;
  animation: color_glow 1s linear infinite alternate;

  @keyframes color_glow {
    from {
      border: 0.25rem solid orange;
      box-shadow: 0 0 0.25em 0 lightsalmon, inset 0 0 0.25em lightsalmon;
    }
    to {
      border: 0.25rem solid brown;
    }
  }
`;
