import styled from 'styled-components';
import boardImage from '../assets/board-high-res.jpg'

export interface BoardProps {
  frameHeight: number;
}

export const Board: React.FC<BoardProps>  = (props: BoardProps) => {
  return(
    <StyledBoard frameHeight={props.frameHeight}>
      <div className="lighting" />
    </StyledBoard>
  );
}

const StyledBoard = styled.div<{frameHeight: number}>`
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
      0% {left: 100vw }
      100% {left: 0px;}
  }

  position: relative;
  left: 0px;
  animation-name: fromRight;
  animation-duration: 0.8s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
 
  .lighting {
    position: absolute;
    width: 100%; height: 100%;
    background-image: linear-gradient(-210deg, #fff2, #fff0);
  }
`;