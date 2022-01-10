import React from 'react';
import styled from 'styled-components';
import { Board } from './Board';
import { LeftPanel } from './LeftPanel';

export const Layout = () => {
    return(
        <StyledLayout>
            <LeftPanel />
            <Board /> 
        </StyledLayout>
    );
}

const StyledLayout = styled.div`
    display: flex;
    * {
        margin: 0px 20px; 
    }
`