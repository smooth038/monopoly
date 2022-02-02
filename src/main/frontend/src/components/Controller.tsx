import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Board } from "components/Board";
import { LeftPanel } from "components/LeftPanel";
import { NewGameModal } from "components/NewGameModal";

export const Controller = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const footerHeight = 0;
  const [isNewGameModalVisible, setNewGameModalVisible] = useState(true);
  const [isMainVisible, setMainVisible] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <StyledLayout>
      {isNewGameModalVisible && <NewGameModal />}
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
