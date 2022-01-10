import React from 'react';
import styled from 'styled-components';
import boardImage from '../assets/board-high-res.jpg'

export const Board = () => {
    return(
      <StyledBoard />
    );
}

const StyledBoard = styled.div`
  border: 3px solid black;
  border-radius: 7px;
  text-align: center;
  width: 90vh;
  height: 90vh;
  margin: 0;
  padding: 0;
  background-image: url(${boardImage});
  background-size: contain;
  background-repeat: no-repeat;
  /* transform: rotate(90deg); */
  filter: drop-shadow(3px 2px 1px black);
`;