import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Die } from "./Die";
import { MessageLog } from "./MessageLog";
import { Player } from "models/player";
import { PlayerList } from "components/PlayerList";
import { RootState } from "app/store";
import { UiActionType } from "models/uiAction";
import { decrementJailTurns } from "slices/gameSlice";
import { gameService } from "service/gameService";
import { nextAction } from "slices/actionsSlice";
import styled from "styled-components";

export interface LeftPanelProps {
  frameHeight: number;
}

export const LeftPanel: React.FC<LeftPanelProps> = (props: LeftPanelProps) => {
  const gameState = useSelector((state: RootState) => state.game);
  const [gameHasBegun, setGameHasBegun] = useState(false);
  const currentPlayerRef = useRef<Player>(
    gameState.players[gameState.currentPlayer]
  );
  const actionsState = useSelector((state: RootState) => state.actions);
  const [dieValues, setDieValues] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const jailRoll = useRef(false);
  const [diceDisabled, setDiceDisabled] = useState(false);
  const [nextPlayerButtonDisabled, setNextPlayerButtonDisabled] =
    useState(true);
  const jailTurnsRemaining = useSelector(
    (state: RootState) =>
      state.game.players[state.game.currentPlayer]?.jailTurnsRemaining
  );
  const [messageLog, setMessageLog] = useState(
    "!!WELCOME TO MONOPOLY!!\nGAME STARTED!\n"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    currentPlayerRef.current = gameState.players[gameState.currentPlayer];
    if (isRolling) {
      return;
    }
    if (gameState.gameLock) {
      setDiceDisabled(true);
    } else {
      switch (gameState.gameStep) {
        case "TURN_BEGIN":
          if (gameState.players[gameState.currentPlayer]?.isInJail) {
            setDiceDisabled(true);
          } else {
            setDiceDisabled(false);
          }
          setNextPlayerButtonDisabled(true);
          break;
        case "TURN_END":
          setNextPlayerButtonDisabled(false);
          setDiceDisabled(true);
          break;
        case "RE_ROLL":
          setDiceDisabled(false);
          break;
        default:
          break;
      }
    }
  }, [gameState, isRolling]);

  useEffect(() => {
    if (gameHasBegun) {
      switch (gameState.gameStep) {
        case "TURN_BEGIN":
          setMessageLog(
            (log) =>
              log + "\nIt's " + currentPlayerRef.current.name + "'s turn!\n"
          );
          break;
        case "TURN_END":
          console.log("TURN END");
          break;
        case "RE_ROLL":
          console.log("RE-ROLL");
          break;
        default:
        // setMessageLog((log) => log + gameState.gameStep + "\n");
      }
    }
  }, [gameState.gameStep, gameHasBegun]);

  useEffect(() => {
    if (actionsState.actions.length > 0) {
      switch (actionsState.actions[0].type) {
        case UiActionType.GAME_START:
          setGameHasBegun(true);
          dispatch(nextAction());
          break;
        case UiActionType.DICE_ROLL:
          setDieValues(actionsState.actions[0].params);
          (async () => {
            setTimeout(() => {
              setIsRolling(false);
              const action = actionsState.actions[0];
              const result = action.params[0] + action.params[1];
              const doubleDice = action.params[2];
              setMessageLog(
                (log) => log + currentPlayerRef.current.name + " has rolled a "
              );
              switch (doubleDice) {
                case 0:
                  if (!jailRoll.current) {
                    setMessageLog((log) => log + result + ".\n");
                  } else {
                    setMessageLog(
                      (log) =>
                        log +
                        result +
                        ", which is not a double, and so must stay in jail for this turn.\n"
                    );
                    jailRoll.current = false;
                  }
                  break;
                case 1:
                  setMessageLog((log) => log + result + ", that's a double!\n");
                  break;
                case 2:
                  setMessageLog(
                    (log) => log + result + ", that's a second double!\n"
                  );
                  break;
                case 3:
                  setMessageLog(
                    (log) =>
                      log +
                      "third double and therefore goes straight to jail!\n"
                  );
                  break;
                default:
                  console.error(
                    "Received a dice roll with a doubleDice value > 3! That should never happen.\n"
                  );
              }
              dispatch(nextAction());
            }, 1000);
          })();
          break;
        case UiActionType.JAIL_IN:
          setMessageLog(
            (log) =>
              log + currentPlayerRef.current.name + " is sent into jail.\n"
          );
          break;
        case UiActionType.JAIL_OUT:
          setMessageLog(
            (log) =>
              log + currentPlayerRef.current.name + " is set free from jail.\n"
          );
          break;
        case UiActionType.TAX:
          setMessageLog(
            (log) =>
              log +
              currentPlayerRef.current.name +
              " pays " +
              actionsState.actions[0].params[0] +
              "$ to the pot. (Total pot: " +
              actionsState.actions[0].params[1].toLocaleString() +
              "$)\n"
          );
      }
    }
  }, [actionsState.actions, dispatch]);

  const handleRollDice = (isJailRoll: boolean = false) => {
    if (isRolling || (!isJailRoll && diceDisabled)) {
      return;
    }
    setIsRolling(true);
    if (isJailRoll) {
      jailRoll.current = true;
      gameService.jailRoll(gameState.gameId, dispatch);
    } else {
      gameService.rollDice(gameState.gameId, dispatch);
    }
  };

  return (
    <StyledLeftPanel frameHeight={props.frameHeight}>
      <PlayerList />
      <StyledDice onClick={(event: React.MouseEvent) => handleRollDice()}>
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
      <div className="buttons">
        <button
          disabled={nextPlayerButtonDisabled}
          className={nextPlayerButtonDisabled ? "disabled" : undefined}
          onClick={(event: React.MouseEvent) =>
            gameService.endTurn(gameState.gameId, dispatch)
          }
        >
          End turn
        </button>
        {jailTurnsRemaining > 0 && gameState.gameStep === "TURN_BEGIN" && (
          <div className="inJailOptions">
            <button
              onClick={(event: React.MouseEvent) =>
                gameService.jailWait(gameState.gameId, dispatch)
              }
            >
              Wait one turn ({jailTurnsRemaining} remaining)
            </button>
            <button
              onClick={(event: React.MouseEvent) => {
                setDiceDisabled(false);
                handleRollDice(true);
              }}
            >
              Try to roll doubles
            </button>
            <button
              disabled={currentPlayerRef.current.cash < 50}
              className={
                currentPlayerRef.current.cash < 50 ? "disabled" : undefined
              }
              onClick={(event: React.MouseEvent) =>
                gameService.jailPay(gameState.gameId, dispatch)
              }
            >
              Pay 50$
            </button>
            <button
              disabled={currentPlayerRef.current.gojfCards > 0}
              className={
                currentPlayerRef.current.gojfCards === 0
                  ? "disabled"
                  : undefined
              }
            >
              Use "get out of jail free" card
            </button>
          </div>
        )}
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
        </button>
        <button
          onClick={(event: React.MouseEvent) => dispatch(allPlayersToJail())}
        >
          Put all players to jail
        </button> */}
        {/* <button onClick={() => setIsRolling(!isRolling)}>
          Toggle die roll
        </button> */}
      </div>
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
    button {
      width: 100%;
      margin: 5px 0px;
    }
  }
`;

const StyledDice = styled.div`
  display: flex;
  /* border: 1px solid red; */

  justify-content: center;
`;
