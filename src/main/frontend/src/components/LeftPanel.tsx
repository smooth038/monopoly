import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Die } from "./Die";
import { GameStep } from "models/game";
import { MessageLog } from "./MessageLog";
import { Player } from "models/player";
import { PlayerList } from "components/PlayerList";
import { RootState } from "app/store";
import { UiActionType } from "models/uiAction";
import { gameService } from "service/gameService";
import { nextAction } from "slices/actionsSlice";
import styled from "styled-components";

export interface LeftPanelProps {
  frameHeight: number;
}

export const LeftPanel: React.FC<LeftPanelProps> = (props: LeftPanelProps) => {
  const gameState = useSelector((state: RootState) => state.game);
  const gameStepRef = useRef<GameStep>(gameState.gameStep);
  const currentPlayerRef = useRef<Player>(
    gameState.players[gameState.currentPlayer]
  );
  const actionsState = useSelector((state: RootState) => state.actions);
  const [dieValues, setDieValues] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [diceDisabled, setDiceDisabled] = useState(false);
  const [nextPlayerButtonDisabled, setNextPlayerButtonDisabled] =
    useState(true);
  const [messageLog, setMessageLog] = useState(
    "!!WELCOME TO MONOPOLY!!\nGAME STARTED!\n"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    gameStepRef.current = gameState.gameStep;
    currentPlayerRef.current = gameState.players[gameState.currentPlayer];
    if (gameState.players.length > 0) {
      switch (gameState.gameStep) {
        case "TURN_BEGIN":
          setMessageLog(
            (log) =>
              log +
              "\nIt's " +
              gameState.players[gameState.currentPlayer].name +
              "'s turn!\n"
          );
          setDiceDisabled(false);
          setNextPlayerButtonDisabled(true);
          break;
        case "TURN_END":
          console.log("TURN END");
          break;
        case "RE_ROLL":
          console.log("RE ROLL");
          break;
        default:
        // setMessageLog((log) => log + gameState.gameStep + "\n");
      }
    }
  }, [gameState]);

  useEffect(() => {
    if (actionsState.isAdvancing) {
      setDiceDisabled(true);
    } else {
      switch (gameStepRef.current) {
        case "TURN_END":
          setNextPlayerButtonDisabled(false);
          break;
        case "RE_ROLL":
          setDiceDisabled(false);
          break;
        default:
          break;
      }
    }
  }, [actionsState.isAdvancing]);

  useEffect(() => {
    if (
      actionsState.actions.length > 0 &&
      actionsState.actions[0].type === UiActionType.DICE_ROLL
    ) {
      setDieValues(actionsState.actions[0].params);
      (async () => {
        setTimeout(() => {
          setIsRolling(false);
          const action = actionsState.actions[0];
          const result = action.params[0] + action.params[1];
          const doubleDice = action.params[0] === action.params[1];
          setMessageLog(
            (log) =>
              log +
              currentPlayerRef.current.name +
              " has rolled " +
              result +
              (doubleDice ? ". That's a double!\n" : ".\n")
          );
          dispatch(nextAction());
        }, 1000);
      })();
    }
  }, [actionsState.actions, dispatch]);

  const handleRollDice = () => {
    if (isRolling || diceDisabled) {
      return;
    }
    setIsRolling(true);
    gameService.rollDice(gameState.gameId, dispatch);
  };

  return (
    <StyledLeftPanel frameHeight={props.frameHeight}>
      <PlayerList />
      <div className="buttons">
        <button
          disabled={nextPlayerButtonDisabled}
          className={nextPlayerButtonDisabled ? "disabled" : undefined}
          onClick={(event: React.MouseEvent) =>
            gameService.endTurn(gameState.gameId, dispatch)
          }
        >
          Next player
        </button>
        {/* <button
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
        </button> */}
        {/* <button onClick={() => setIsRolling(!isRolling)}>
          Toggle die roll
        </button> */}
      </div>
      <StyledDice onClick={handleRollDice}>
        <Die
          disabled={diceDisabled}
          value={dieValues[0]}
          rolling={isRolling}
          dieNumber={1}
        />
        <Die
          disabled={diceDisabled}
          value={dieValues[1]}
          rolling={isRolling}
          dieNumber={2}
        />
      </StyledDice>
      <MessageLog value={messageLog} />
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
    top: 700px;
  }
`;

const StyledDice = styled.div`
  display: flex;
  /* border: 1px solid red; */

  justify-content: center;
`;
