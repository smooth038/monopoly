import React from 'react';
import styled from 'styled-components';

export const LeftPanel = () => {
    return(
        <StyledLeftPanel>
            <h2>Welcome </h2> 
        </StyledLeftPanel>
    )
}

const StyledLeftPanel = styled.div`
    background-color: #222;
    border: 1px solid black;
    border-radius: 10px;
    filter: drop-shadow(3px 2px 1px #000);
    padding: 20px;
    min-width: 400px;
    opacity: 0.7;
    color: white;
`