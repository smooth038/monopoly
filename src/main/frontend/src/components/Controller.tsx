import { Board } from 'components/Board';
import { LeftPanel } from 'components/LeftPanel';
import { NewGameModal } from 'components/NewGameModal';
import { PlayerInfo } from 'models/player';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gameService } from 'service/gameService';
import styled from 'styled-components';

export const Controller = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const footerHeight = 0;
  const [isNewGameModalVisible, setNewGameModalVisible] = useState(false);
  const [isMainVisible, setMainVisible] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNewGameStart = (players: PlayerInfo[]) => {
    setNewGameModalVisible(false);
    gameService.startNewGame(players, dispatch);
    setMainVisible(true);
  };

  return (
    <StyledLayout>
      {isNewGameModalVisible && <NewGameModal onStart={handleNewGameStart} />}
      {isMainVisible && (
        <div className="main">
          <LeftPanel frameHeight={windowHeight - footerHeight} />
          <span />
          <Board frameHeight={windowHeight - footerHeight} />
        </div>
      )}
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  margin: 0;
  padding: 0;
  .main {
    display: flex;
    span {
      width: 20px;
    }
  }
`;
